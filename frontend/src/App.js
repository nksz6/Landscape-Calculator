import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CalculatorView from './views/CalculatorView';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import EstimatesView from './views/EstimatesView';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<CalculatorView />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeView />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/estimates"
            element={
              <ProtectedRoute>
                <EstimatesView />
              </ProtectedRoute>
            }
          />

          {/* Guest Routes */}
          {/* Wrapping LoginView in GuestRoute */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginView />
              </GuestRoute>
            }
          />
          {/*Wrapping RegistrationView in GuestRoute*/}
          <Route
            path="/registration"
            element={
              <GuestRoute>
                <RegistrationView />
              </GuestRoute>
            }
          />
        
        </Routes>
      </header>
    </div>
  );
}

export default App;