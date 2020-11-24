import logo from './logo.svg';
import './App.css';
import Camera from './camera'
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
            <Link to="/videos">Videos</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          Hem
        </Route>
        <Route path="/Pages/Recordings">Videos</Route>
      </Switch>
    </Router>
      </header>
      <Camera/>
      
    </div>
  );
}

export default App;
