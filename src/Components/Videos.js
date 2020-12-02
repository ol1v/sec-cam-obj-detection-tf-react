import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Download } from '../Utils/Files'

/** *********************
 *  **STYLED-COMPONENTS**
    ********************* */

const Div = styled.div`
        color: white;
        `

function Videos() {

  const [records, setRecords] = useState([])

  const videoElement = useRef(null)

  // fetch saved videos from server

  useEffect(() => {
    axios.get('http://localhost:8000/saved-videos')
      .then(res => {

        console.log(res)

        setRecords(res.data.data)
        
      })

    // axios.get('http://localhost:8000/test', { responseType: 'blob' })
    //   .then(res => {
    //     const videoStream = res.data
    //     let testRes = new Blob([videoStream], { type: 'video/webm' })
    //     console.log(testRes)

    //     const href = URL.createObjectURL(testRes)
    //     const blob = testRes

    //     setRecords({href,blob})
    //   })
  }, [videoElement])
  return <Div>

    Browse your saved videos here.
    {videoElement.current && <video controls src={videoElement.current.href}
    />}

    <div>
      <h3>Saved Records</h3>
      {!records && <h3>You have no saved records</h3>}
      {!records.length
        ? null
        : records.map(record => {
          return (
            <div key={record}>
              <div >
                <h5>{record}</h5>
                <p>Add thumbnail here</p>
                <button
                  onClick={() => {
                    Download().then(res => {
                      const videoStream = res.data
                      let testRes = new Blob([videoStream], { type: 'video/webm' })

                      const href = URL.createObjectURL(testRes)
                      const blob = testRes

                      videoElement.current = {href, blob} // funkar måste rendera i ett videoelement bara..
                      
                      setRecords({href, blob}) // very temporary...
                    })

                  }}
                >Watch Video</button>
              </div>
            </div>
          );
        })}
    </div></Div>
}

export default Videos