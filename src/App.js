import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TrajetsList from './pages/TrajetsList';
import UserProfile from './pages/UserProfile';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/signup"><Register /></Route>
        <Route path="/trajets"><TrajetsList /></Route>
        <Route path="/profile/:id"><UserProfile /></Route>
        <Route path="/logout"><Logout /></Route>
      </Switch>
    </Router>
  );
}

export default App;
