import Videos from '../Components/Videos'
import {useContext} from 'react'
import AppContext from '../Utils/AppContext'

/**För G:
    

För VG så ska, utöver att kraven för G är uppfyllda, följande vara uppfyllt:

    Använd useContext eller liknande för tillståndshantering (minst ett värde)
    Använd minst en formulärkomponent (ett element räcker)
    Lämna in helt konsistent formaterad kod (förslagsvis kod formaterad automatiskt via Code)
 */

 function Recordings () {
     const Val = useContext(AppContext)
     return <div>
         <Videos/>
        <div>{Val}</div>
     </div>
 }

 export default Recordings