import axios from 'axios'
/** Get formData as prop and upload to server */

export const Upload = async (data, values) => {
    // fetch upload to localhost:8000/upload-video
    console.log('data from Formik form: ' + data.blob)

    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('description', values.description)
    fd.append('files', data.blob)
    let url = 'http://localhost:8000/'

    await axios.post(url + 'upload-video/', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
            // Handle result
            if(res.message) 
            console.log(res.message)
            else
            console.log(res)
        })
}
