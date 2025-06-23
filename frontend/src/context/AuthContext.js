import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    // When the token changes, update the user state
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id });
        localStorage.setItem('token', token);
      } catch (e) {
        // Handle invalid token
        setUser(null);
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  
    //Return a promise that resolves when the user state is updated.
    return new Promise((resolve) => {
      try {
        const decoded = jwtDecode(newToken);
        setUser({ id: decoded.id });
        localStorage.setItem('token', newToken);
        resolve();
      } catch (e) {
        // Handle invalid token
        setUser(null);
        localStorage.removeItem('token');
        resolve();
      }
    })
  
  };

  const logout = () => {
    setToken(null);
  };

  const authContextValue = {
    token,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};