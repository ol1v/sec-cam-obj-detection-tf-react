import React, { useRef, useEffect } from 'react'
import '@tensorflow/tfjs'
import * as cocoSsd from "@tensorflow-models/coco-ssd"

const Camera = () => {
    
    // refs
    const videoElement = useRef(null)
    const modelRef = useRef(null)


useEffect(() => {
    async function prepare() {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
            } catch(error) {
                console.log(error)
            }
        }
    }
    prepare()
}, [])

async function detectFrame() {
    const predictions = await modelRef.current.detect(videoElement.current)

    let activityDetected = false
    for(let i = 0; i < predictions.length; i++) {
        if(predictions[i].class === 'person') {
            console.log('person detected')
            activityDetected = true
        }
    }
    // Add recording if person is detected here.

    requestAnimationFrame(() => {
        detectFrame() // recursively run detection of objects   
    })
}

return (
    <div>
        <video autoPlay playsInline muted ref={videoElement}/>
        <button
        onClick={() => {
            // Run detection
            detectFrame()
        }}>Start</button>
    </div>
)
}

export default Camera

