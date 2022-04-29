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
import CurrentUserTrajets from './pages/CurrentUserTrajets';
import ReservationsList from './pages/ReservationsList';
import CovoituragesList from './pages/CovoituragesList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/signup"><Register /></Route>
        <Route path="/trajets"><TrajetsList /></Route>
        <Route path="/profile/:id"><UserProfile /></Route>
        <Route path="/usertrajets">
          <CurrentUserTrajets />
        </Route>
        <Route path="/reservations/:id">
          <ReservationsList />  
        </Route>
        <Route path="/covoiturages">
          <CovoituragesList />  
        </Route>
        <Route path="/logout"><Logout /></Route>
      </Switch>
      
    </Router>
  );
}

export default App;
