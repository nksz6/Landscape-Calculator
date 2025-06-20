import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CalculatorView from './views/CalculatorView';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import EstimatesView from './views/EstimatesView';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
          {/* Route for the main calculator page */}
          <Route path="/" element={<CalculatorView />} />

          {/* Route for the logged-in user's home/dashboard */}
          <Route path="/home" element={<HomeView />} />

          {/* Route for viewing saved estimates */}
          <Route path="/estimates" element={<EstimatesView/>} />

          {/* Route for the login page */}
          <Route path="/login" element={<LoginView />} />

          {/* Route for the registration page */}
          <Route path="/registration" element={<RegistrationView />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;