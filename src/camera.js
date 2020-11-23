import React, { useRef, useEffect } from 'react'
import '@tensorflow/tfjs'

const Camera = () => {
    
    // refs
    const videoElement = useRef(null)


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
            } catch(error) {
                console.log(error)
            }
        }
    }
    prepare()
}, [])

return (
    <div>
        <video autoPlay playsInline muted ref={videoElement}/>
        <div>hej</div>
    </div>
)
}

export default Camera

