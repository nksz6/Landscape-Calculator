import React, { useState, useEffect } from 'react';
import ProjectDetails from '../components/ProjectDetails';
import '../App.css';

function CalculatorView() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/services')
      .then(res => {
        if (!res.ok) {
          // Throw an error if the server response is not "OK" (e.g., 404, 500)
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setServices(data);
      })
      .catch(error => {
        // Catch any errors that happen during the fetch
        console.error("Fetch Error:", error);
        setError("Failed to load services. Please check your connection or try again later.");
      })
      .finally(() => {
        // This runs whether the fetch succeeded or failed
        setIsLoading(false);
      });
  }, []); // Empty dependency array means this still runs only once

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  if (error) {
    return <div className="App-header"><p className="error-message">{error}</p></div>;
  }

  if (isLoading) {
    return <div className="App-header"><p>Loading Services...</p></div>;
  }

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

export default CalculatorView;