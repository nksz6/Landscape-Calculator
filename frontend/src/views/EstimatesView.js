import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function EstimatesView() {
  const [estimates, setEstimates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/estimates`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Could not fetch your estimates.');
        }

        const data = await response.json();
        setEstimates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchEstimates();
    }
  }, [token]);

  if (isLoading) {
    return <p>Loading your saved estimates...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="view-container">
      <h1>My Saved Estimates</h1>

      {estimates.length === 0 ? (
        <p>You have no saved estimates yet. Go to the calculator to create one!</p>
      ) : (
        <div className="estimates-list">
          {estimates.map(estimate => (
            <div key={estimate.id} className="estimate-card">
              <div className="estimate-header">
                <h2>{estimate.service_name}</h2>
                <p className="estimate-cost">${parseFloat(estimate.estimated_cost).toFixed(2)}</p>
              </div>
              <div className="estimate-body">
                <p><strong>Input:</strong> {estimate.input_value} {estimate.unit_label}</p>
                {estimate.material_name && (
                  <p><strong>Material:</strong> {estimate.material_name}</p>
                )}
              </div>
              <div className="estimate-footer">
                <p>Saved on: {new Date(estimate.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EstimatesView;