import {useEffect} from 'react'
import axios from 'axios'
/** Get formData as prop and upload to server */

function Upload(data) {
    // fetch upload to localhost:8000/upload-video
    useEffect(() => {
        async function sendFile() {
            const formData = new formData()
            formData.append('files', data)
            let url = 'http://localhost:3000/'

            await axios
                .post(url + 'upload-video/', formData)
                .then((res) => {
                    // Handle result
                })
        }
    }, [])

    // return message if upload was successful
}

export default Upload