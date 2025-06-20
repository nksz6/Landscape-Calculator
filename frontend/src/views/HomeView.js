import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation

function HomeView() {
  return (
    <div>
      <h1>Welcome to Your Home Dashboard!</h1>
      <p>This is the landing page for logged-in users.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/estimates" className="calculate-btn">View My Estimates</Link>
        <Link to="/" className="calculate-btn" style={{ marginLeft: '10px' }}>Go to Calculator</Link>
      </div>
    </div>
  );
}

export default HomeView;