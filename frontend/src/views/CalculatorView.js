import React, { useState, useEffect } from 'react';
import ProjectDetails from '../components/ProjectDetails';
import ServiceList from '../components/ServiceList';
import '../App.css';

function CalculatorView() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect hook
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/services`)
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

  // --- ADD THIS FUNCTION ---
  // This function will set the selected service back to null, hiding the details.
  const handleClearSelection = () => {
    setSelectedService(null);
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (isLoading) {
    return <p>Loading Services...</p>;
  }

  return (
    <>
      <h1>Nick's Landscape Calculator</h1>
      <h2>Choose Your Service</h2>
      <ServiceList
        services={services}
        selectedService={selectedService}
        onServiceSelect={handleServiceSelect}
      />

      {selectedService && (
        <ProjectDetails
          key={selectedService.id}
          selectedService={selectedService}
          // --- PASS THE NEW FUNCTION AS A PROP ---
          onClearSelection={handleClearSelection}
        />
      )}
    </>
  );
}

export default CalculatorView;