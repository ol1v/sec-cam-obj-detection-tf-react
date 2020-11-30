import { useEffect, useState } from 'react'
import axios from 'axios'
function Videos() {

    const [records, setRecords] = useState([])

    // fetch saved videos from server

    useEffect(() => {
        axios.get('http://localhost:8000/saved-videos')
        .then(res => {
            console.log(res)
            setRecords(res.data)
        })
    },[])
    return <div>{!records.length
        ? null
    : <div>{records}</div>}</div>
} 

export default Videos