import React, { useState, useEffect } from 'react';

// --- ACCEPT THE NEW PROP HERE ---
function ProjectDetails({ selectedService, onClearSelection }) {
  // State for the selected material option, defaults to the first option
  const [selectedOption, setSelectedOption] = useState(selectedService.pricing_options[0]);
  const [inputValue, setInputValue] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [minChargeApplied, setMinChargeApplied] = useState(false);

  // This effect hook resets the cost when the selected material changes
  useEffect(() => {
    setEstimatedCost(null);
    setMinChargeApplied(false);
  }, [selectedOption]);

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

  // Check if we need to show the dropdown
  const showOptionsDropdown = selectedService.pricing_options.length > 1;

  //disabled button logic
  const isButtonDisabled = !inputValue || parseFloat(inputValue) <= 0;

    return (
        <div className="selection-details">
            {/* --- ADD THE BUTTON AND ONCLICK HANDLER --- */}
            <div className="details-header">
              <h3>Details for: {selectedService.name}</h3>
              <button onClick={onClearSelection} className="clear-btn">
                ×
              </button>
            </div>

            {/* Conditionally render the dropdown */}
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
                </div>
            )}
        </div>
    );
}

export default ProjectDetails;