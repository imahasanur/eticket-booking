import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TicketCounter from './components/TicketCounter/TicketCounter';
import Header from './components/Header/Header';
import LogIn from './components/LogIn/LogIn';
import Destination from './components/Destination/Destination';
import NotFound from './components/NotFound/NotFound';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value ={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/ticketCounter">
            <TicketCounter></TicketCounter>
          </Route>
          <PrivateRoute path="/destination/:ticketId">
            <Destination></Destination>
          </PrivateRoute>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <Route exact path="/">
            <TicketCounter></TicketCounter>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
