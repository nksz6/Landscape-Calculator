import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginView() {
  const [email, setEmail] = useState('');
  const [***REMOVED***, set***REMOVED***] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:***REMOVED***/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ***REMOVED*** }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      login(data.token); // Use the login function from AuthContext
      navigate('/home'); // Redirect to the home dashboard on success

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit" className="calculate-btn">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default LoginView;