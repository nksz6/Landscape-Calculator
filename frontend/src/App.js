import ProjectDetails from './components/ProjectDetails';
import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  // Create a state variable to hold the array of services
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const handleServiceSelect  = (service) => {
    setSelectedService(service);
  };

  useEffect(() => {
    // Fetch data from our new /api/services endpoint
    fetch('http://localhost:5001/api/services')
    .then(res => res.json()) // parse json
    .then(data => setServices(data)); // Set the entire array of services
  }, []); // The empty array means this effect runs only once

  return (
    <div className="App">
      <header className="App-header">
        <h1>Choose Your Service</h1>
        <div className="service-list">
          {services.map(service => {
            const isSelected = selectedService && selectedService.id === service.id;
            return (
              <div
                key={service.id}
                className={`service-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleServiceSelect(service)}
              >
                <h2>{service.name}</h2>
                <p>{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* This part is now cleaner and uses our new component */}
        {selectedService && <ProjectDetails selectedService={selectedService} />}

      </header>
    </div>
  );
}

export default App;