import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function ProjectDetails({ selectedService, onClearSelection }) {
  const { user, token } = useAuth();

  const [selectedOption, setSelectedOption] = useState(selectedService.pricing_options[0]);
  const [inputValue, setInputValue] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [minChargeApplied, setMinChargeApplied] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');

  useEffect(() => {
    setEstimatedCost(null);
    setMinChargeApplied(false);
    setSaveStatus('idle');
  }, [selectedOption, selectedService]);

  const handleCalculateClick = () => {
    if (!inputValue) {
      alert('Please enter a value.');
      return;
    }
    const numericValue = parseFloat(inputValue);
    const price = parseFloat(selectedOption.price_per_unit);
    const minimum = parseFloat(selectedOption.minimum_charge);
    const calculatedCost = numericValue * price;
    const finalCost = Math.max(calculatedCost, minimum);
    setMinChargeApplied(calculatedCost < minimum);
    setEstimatedCost(finalCost);
  };

  const handleOptionChange = (event) => {
    const newSelectedRuleId = parseInt(event.target.value, 10);
    const newSelectedOption = selectedService.pricing_options.find(
      opt => opt.rule_id === newSelectedRuleId
    );
    setSelectedOption(newSelectedOption);
  };

  const handleSaveEstimate = async () => {
    if (!user) {
      alert('You must be logged in to save an estimate.');
      return;
    }
    setSaveStatus('saving');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/estimates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceName: selectedService.name,
          materialName: selectedOption.material_name,
          inputValue: parseFloat(inputValue),
          unitLabel: selectedService.unit_label,
          estimatedCost: estimatedCost,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save estimate.');
      }

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);

    } catch (error) {
      console.error("Save Error:", error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const showOptionsDropdown = selectedService.pricing_options.length > 1;
  const isButtonDisabled = !inputValue || parseFloat(inputValue) <= 0;

  return (
    <div className="selection-details">
      <div className="details-header">
        <h3> {selectedService.name} </h3>
        <button onClick={onClearSelection} className="clear-btn">
          ×
        </button>
      </div>

      {showOptionsDropdown && (
        <div className="input-group">
          <label>Select Material:</label>
          <select onChange={handleOptionChange} value={selectedOption.rule_id} className="material-select">
            {selectedService.pricing_options.map(option => (
              <option key={option.rule_id} value={option.rule_id}>
                {option.material_name} (${option.price_per_unit}/sq ft)
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="input-group">
        <label>Enter {selectedService.unit_label}:</label>
        <input
          type="number"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="0"
        />
      </div>

      <button
        onClick={handleCalculateClick}
        className="calculate-btn"
        disabled={isButtonDisabled}
      >
        Calculate Cost
      </button>

      {estimatedCost !== null && (
        <div className="cost-display">
          <h3>Estimated Cost:</h3>
          <p>${estimatedCost.toFixed(2)}</p>
          {minChargeApplied && (
            <p className="notice">
              (Minimum charge of ${parseFloat(selectedOption.minimum_charge).toFixed(2)} applied)
            </p>
          )}

          {user && (
            <div className="save-section">
              {saveStatus === 'idle' && (
                <button onClick={handleSaveEstimate} className="save-btn">
                  Save Estimate
                </button>
              )}
              {saveStatus === 'saving' && <p>Saving...</p>}
              {saveStatus === 'success' && <p className="success-message">Estimate Saved!</p>}
              {saveStatus === 'error' && <p className="error-message">Could not save. Please try again.</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;