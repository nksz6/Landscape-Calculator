import React, { useState } from 'react';

function ProjectDetails({ selectedService }) {
    const [inputValue, setInputValue] = useState('');
    const [estimatedCost, setEstimatedCost] = useState(null);

    const handleCalculateClick = () => {
        if (!inputValue) {
            alert('Please enter a value.');
            return;
        }
        const numericValue = parseFloat(inputValue);
        const price = parseFloat(selectedService.price_per_unit);
        const cost = numericValue * price;
        setEstimatedCost(cost);
    };

    return (
        <div className="selection-details">
            <h3>Details for: {selectedService.name}</h3>
            <div className="input-group">
                <label>Enter {selectedService.unit_label}:</label>
                <input
                    type="number"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="0"
                />
            </div>
            <button onClick={handleCalculateClick} className="calculate-btn">
                Calculate Cost
            </button>
            {estimatedCost !== null && (
                <div className="cost-display">
                    <h3>Estimated Cost:</h3>
                    <p>${estimatedCost.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default ProjectDetails;