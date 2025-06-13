import React, { useState, useEffect } from 'react';
import ProjectDetails from './components/ProjectDetails';
import './App.css';

function App() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch('http://localhost:***REMOVED***/api/services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

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
        {selectedService && (
          <ProjectDetails
            key={selectedService.id}
            selectedService={selectedService}
          />
        )}
      </header>
    </div>
  );
}

export default App;