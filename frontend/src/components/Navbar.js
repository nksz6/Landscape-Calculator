import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className="main-nav">
      <Link to="/">Calculator</Link>
      {user ? (
        <>
          {/* Show these links if the user IS logged in */}
          <Link to="/home">Home</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </>
      ) : (
        <>
          {/* Show these links if the user IS NOT logged in */}
          <Link to="/login">Login</Link>
          <Link to="/registration">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;