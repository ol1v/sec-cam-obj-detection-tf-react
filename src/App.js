import './App.css';
import Homepage from './Pages/Homepage'
import Recordings from './Pages/Recordings'
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppContext from './Utils/AppContext'

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
