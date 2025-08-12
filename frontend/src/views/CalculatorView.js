import React, { useState, useEffect } from 'react';
import ProjectDetails from '../components/ProjectDetails';
import ServiceList from '../components/ServiceList';
import ServiceListSkeleton from '../components/ServiceListSkeleton';
import '../App.css';

function CalculatorView() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
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
    }, 0); //fine at zero but maybe remove
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleClearSelection = () => {
    setSelectedService(null);
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (isLoading) {
    return <ServiceListSkeleton />
  }

  return (
    <>
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
          onClearSelection={handleClearSelection}
        />
      )}
    </>
  );
}

export default CalculatorView;