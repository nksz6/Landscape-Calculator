import React, { useState, useEffect } from 'react';
import ProjectDetails from '../components/ProjectDetails';
import ServiceList from '../components/ServiceList';
import '../App.css';

function CalculatorView() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:***REMOVED***/api/services')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setServices(data);
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        setError("Failed to load services. Please check your connection or try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (isLoading) {
    return <p>Loading Services...</p>;
  }

  return (
    <>
      <h1>Choose Your Service</h1>
      <ServiceList
        services={services}
        selectedService={selectedService}
        onServiceSelect={handleServiceSelect}
      />

      {selectedService && (
        <ProjectDetails
          key={selectedService.id}
          selectedService={selectedService}
        />
      )}
    </>
  );
}

export default CalculatorView;