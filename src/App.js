import './App.css';
import Homepage from './Pages/Homepage'
import Recordings from './Pages/Recordings'
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppContext from './Utils/AppContext'

/** TODO: 
 *  CLIENT:
 *  Fix thumbnails with ffmpeg
 *  Create callbackRef that can handle rerendering component after video is set in Videos.js
 *  Fix UX
 *  Clean project up
 *  
 *  SERVER:
 *  Put all information about uploadedfiles in database
 *  Use router for better projectstructure
 *  Create thumbnails of uploaded videos and send back to client
 *  Clean up code
 *  Error handeling
 *  
 */

function App() {
  return (
    <div className="App">
      <div>You  have 5 unsaved videos</div>
      <h1>Security Camera</h1>
      <Router>
        <nav className="Navbar">
          <ul>
            <li>
              <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
            </li>
            <li>
              <Link to="/Recordings">Recordings</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/Recordings">
              <AppContext.Provider value={'Använd detta till något vettigt senare'}>
              <Recordings />
              </AppContext.Provider>
              
              
            
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
