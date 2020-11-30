import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

/** *********************
 *  **STYLED-COMPONENTS**
    ********************* */

const Div = styled.div`
        color: white;
        `

function Videos() {

  const [records, setRecords] = useState([])

  // fetch saved videos from server

  useEffect(() => {
    axios.get('http://localhost:8000/test', { responseType: 'blob' })
      .then(res => {
        const videoStream = res.data
        let testRes = new Blob([videoStream], { type: 'video/webm' })
        console.log(testRes)
        
        const href = URL.createObjectURL(testRes)
        const blob = testRes

        setRecords({href,blob})
      })
  }, [])
  return <Div>

    Browse your saved videos here.
        {records && <video controls src={records.href}
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

                <button
                  onClick={() => {

                  }}
                >Watch Video</button>
              </div>
            </div>
          );
        })}
    </div></Div>
}

export default Videos