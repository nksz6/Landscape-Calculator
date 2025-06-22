import React, { useState } from 'react';
// You will need to import these two hooks for the next step after login is working
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

function RegistrationView() {
  const [email, setEmail] = useState('');
  const [***REMOVED***, set***REMOVED***] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // <-- THIS LINE WAS MISSING

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); 
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:***REMOVED***/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ***REMOVED*** }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      console.log('Received token:', data.token);
      setSuccess('Registration successful! You can now log in.');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>***REMOVED***</label>
          <input
            type="***REMOVED***"
            value={***REMOVED***}
            onChange={e => set***REMOVED***(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="calculate-btn">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default RegistrationView;