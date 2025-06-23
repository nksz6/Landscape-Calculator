import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegistrationView() {
  const [email, setEmail] = useState('');
  const [***REMOVED***, set***REMOVED***] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:***REMOVED***/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ***REMOVED*** }),
      });

      const data = await response.json();
      if (!response.ok) { throw new Error(data.error || 'Something went wrong'); }
      
      //wait for the login to complete before navigating
      await login(data.token);
      navigate('/home');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          {/* Link the label to the input */}
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          {/* Link the label to the input */}
          <label htmlFor="register-***REMOVED***">***REMOVED***</label>
          <input
            id="register-***REMOVED***"
            type="***REMOVED***"
            value={***REMOVED***}
            onChange={e => set***REMOVED***(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="calculate-btn">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default RegistrationView;