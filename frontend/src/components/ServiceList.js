import React from 'react';

function ServiceList({ services, selectedService, onServiceSelect }) {
  return (
    <div className="service-list">
      {services.map(service => {
        const isSelected = selectedService && selectedService.id === service.id;

        return (
          <div
            key={service.id}
            className={`service-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onServiceSelect(service)}
          >
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ServiceList;