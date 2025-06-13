import React, { useState } from 'react';

// This component receives the selectedService as a "prop" from App.js
function ProjectDetails({ selectedService }) {
    // State to hold the value of the input field
    const [inputValue, setInputValue] = useState('');

    // A function to determine the correct label for the input
    const getLabelText = () => {
        switch (selectedService.name) {
            case 'Lawn Mowing':
                return 'Enter Lawn Size (in Square Feet):';
            case 'Mulch Installation':
                return 'Enter Mulch Area (in Square Feet):';
            case 'Shrub Trimming':
                return 'Enter Number of Shrubs:';
            default:
                return 'Enter Details:';
        }
    };

    return (
        <div className="selection-details">
            <h3>Details for: {selectedService.name}</h3>

            <div className="input-group">
                <label>{getLabelText()}</label>
                <input
                    type="number"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="0"
                />
            </div>


            <p><em>(For now, we are just capturing this value. Next, we'll calculate!)</em></p>
            <p>Current Input Value: <strong>{inputValue}</strong></p>
        </div>
    );
}

export default ProjectDetails;