import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CalculatorView from './views/CalculatorView';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import EstimatesView from './views/EstimatesView';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
          {/* --- Public Routes --- */}
          
          {/* Route for the main calculator page */}
          <Route path="/" element={<CalculatorView />} />

          {/* --- Protected Routes --- */}

          {/* Route for the logged-in user's home/dashboard */}
          <Route path="/home" element={<HomeView />} />
          
          {/* Route for viewing saved estimates */}
          <Route path="/estimates" element={<EstimatesView/>} />

          {/* --- Guest Routes (for non-logged-in users --- */}
          
          <Route path="/login" element={<LoginView />} />
          
          <Route path="/registration" element={<RegistrationView />} />
        
        </Routes>
      </header>
    </div>
  );
}

export default App;