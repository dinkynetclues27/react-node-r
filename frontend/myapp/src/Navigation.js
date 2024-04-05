import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css'

const NavigationBar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/"></Link>
        </div>
        <ul className="nav-links">
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/page1">Page 1</Link>
              </li>
              <li>
                <Link to="/page2">Page 2</Link>
              </li>
              <li>
                <Link to="/page3">Page 3</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
