import logo from './logo.svg';
import './App.css';
import Camera from './Components/camera'
import Recordings from './Pages/Recordings'
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Recordings">Recordings</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <Camera/>
        </Route>
        <Route path="/Recordings">
          <Recordings/>
        </Route>
      </Switch>
    </Router>
      </header>
    </div>
  );
}

export default App;
