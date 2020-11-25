import axios from 'axios'
/** Get formData as prop and upload to server */

export const Upload = async (data) => {
    // fetch upload to localhost:8000/upload-video

    const fd = new FormData()
    console.log('DATA:: ' + data.blob)
    fd.append('name', data.title)
    fd.append('files', data.blob)
    let url = 'http://localhost:8000/'

    await axios.post(url + 'upload-video/', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
            console.log('POST REQUEST')
            // Handle result
            if(res.message) 
            console.log(res.message)
            else
            console.log(res)
        })
}
