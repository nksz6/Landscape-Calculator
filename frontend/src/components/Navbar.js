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
      {/* --- Zone 1: Left Justified --- */}
      <div className="nav-left">
        <span className="nav-title">Nick's Landscape Calculator</span>
      </div>

      {user ? (
        <>
          {/* --- LOGGED-IN STATE --- */}
          {/* --- Zone 2: Center Justified --- */}
          <div className="nav-center">
            <Link to="/home">Home</Link>
            <Link to="/">Calculator</Link>
            <Link to="/estimates">Estimates</Link>
          </div>
          {/* --- Zone 3: Right Justified --- */}
          <div className="nav-right">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </>
      ) : (
        <>
          {/* --- LOGGED-OUT STATE --- */}
          {/* --- Zone 2: Center Justified --- */}
          <div className="nav-center">
            <Link to="/">Calculator</Link>
          </div>
          {/* --- Zone 3: Right Justified --- */}
          <div className="nav-right">
            <Link to="/login">Login</Link>
            <Link to="/registration">Register</Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;