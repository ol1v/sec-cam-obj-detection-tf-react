import React, { useRef, useEffect, useState } from 'react'
import '@tensorflow/tfjs'
import * as cocoSsd from "@tensorflow-models/coco-ssd"

const Camera = () => {
    // state for saving recorded video
    const [records, setRecords] = useState([])

    // refs
    const videoElement = useRef(null)
    const modelRef = useRef(null)
    const recorderRef = useRef(null)
    const recordingStandby = useRef(false)
    const recordingActive = useRef(false)
    const lastDetectedFramesRef = useRef([]) /**Array of booleans to make sure recording doesn't 
                                        stop because the model can't recognize object (framedrop) */

    useEffect(() => {
        async function prepare() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: true
                    });
                    window.stream = stream
                    videoElement.current.srcObject = stream

                    // Load TensorFlow model and asign to ref at start.
                    const model = await cocoSsd.load()
                    modelRef.current = model

                } catch (error) {
                    console.log(error)
                }
            }
        }
        prepare()
    }, [])

    async function detectFrame() {
        if(!recordingStandby.current) {
            stopRecording()
            return
        }

        const predictions = await modelRef.current.detect(videoElement.current)

        let activityDetected = false
        for (let i = 0; i < predictions.length; i++) {
            if (predictions[i].class === 'person') {
                activityDetected = true
            }
        }

        if(activityDetected) {
            console.log('found person')
            startRecording()
            lastDetectedFramesRef.current.push(true)
        } else if(lastDetectedFramesRef.current.filter(Boolean).length){
            startRecording()
            lastDetectedFramesRef.current.push(false)
        } else {
            stopRecording()
        }

        // Remove and leave only 10 values for checking for framedrop
        lastDetectedFramesRef.current = lastDetectedFramesRef.current.slice(
            Math.max(lastDetectedFramesRef.current.length - 10, 0)
        )

        requestAnimationFrame(() => {
            detectFrame() // recursively run detection of objects   
        })
    }

    function startRecording() {
        if(recordingActive.current) {
            return;
        }
        // start recording
        recordingActive.current = true
        console.log('started recording')

        // Create mediarecorder and save video content from stream
        recorderRef.current = new MediaRecorder(window.stream)

        recorderRef.current.ondataavailable = function(e) {         // POST to backend here?
            const title = new Date() + ""
            const href = URL.createObjectURL(e.data)
            const blob = e.data
            setRecords(previousRecords => {
                return [...previousRecords, {href, title, blob}]
            })
        }

        recorderRef.current.start()
    }

    function stopRecording() {
        if(!recordingActive.current) {
            return;
        }
        // stop recording
        recordingActive.current = false
        recorderRef.current.stop()
        console.log('stopped recording')
        lastDetectedFramesRef.current = [] // Clear last detected frames
    }

    return (
        <div>
            <video autoPlay playsInline muted ref={videoElement}
                 />
            <button
                onClick={() => {
                    // Run detection
                    recordingStandby.current = true
                    detectFrame()
                }}>Start</button>
            <button
                onClick={() => {
                    // Run detection
                    recordingStandby.current = false
                    stopRecording()
                    console.log(records[0])
                }}
                >Stop</button>
            <div>
                <h3>Records:</h3>
                {!records.length
            ? null
            : records.map(record => {
                return (
                  <div key={record.title}>
                    <div >
                      <h5>{record.title}</h5>
                      <video controls src={record.href}></video>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
        
    )
}

export default Camera

