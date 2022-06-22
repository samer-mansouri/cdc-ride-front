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
import UsersTable from './pages/Admin/UsersTable';
import TrajetsTable from './pages/Admin/TrajetsTable';
import CarsTable from './pages/Admin/CarsTable';
import DeclarationsTable from './pages/Admin/DeclarationsTable';
import AdminRoute from './routes/AdminRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import ErrorPage from './routes/ErrorPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={Register} />
        
        <Route path="/trajets" component={TrajetsList} />
        <ProtectedRoute path="/profile/:id" component={UserProfile} />
        <ProtectedRoute path="/usertrajets" component={CurrentUserTrajets} />
        
        <ProtectedRoute path="/reservations/:id" component={ReservationsList} />  
        
        <ProtectedRoute path="/covoiturages" component={CovoituragesList} />
        

        <Route path="/logout"><Logout /></Route>
        <AdminRoute path="/admin-users" component={UsersTable} />
        <AdminRoute path="/admin-trajets" component={TrajetsTable} />
        <AdminRoute path="/admin-cars" component={CarsTable} />
        <AdminRoute path="/admin-declarations" component={DeclarationsTable} />

        <Route path="*"><ErrorPage /></Route>
        
      </Switch>
      
    </Router>
  );
}

export default App;
