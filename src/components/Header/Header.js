import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
  let [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/ticketCounter">Ticket Booking</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ml-auto">
                  <Link className="nav-link active" aria-current="page" to="/ticketCounter" >Home</Link>
                  <Link className="nav-link" to="/destination/1">Destination</Link>
                  <Link className="nav-link" to="/about">Blog</Link>
                  <Link className="nav-link" to="/about">Contact</Link>
                  <Link className="login-button " to="/login" >{loggedInUser.email ? <span>{loggedInUser.name}</span> :<span>Log in</span>}</Link>
              </div>
            </div>
        </div>
      </nav>
            
    </div>
  );
};

export default Header;