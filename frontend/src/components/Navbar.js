import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="main-nav">
      <Link to="/">Calculator</Link>
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Register</Link>
    </nav>
  );
}

export default Navbar;

//