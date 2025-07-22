import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id });
        localStorage.setItem('token', token);
      } catch (e) {
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
  
    return new Promise((resolve) => {
      try {
        const decoded = jwtDecode(newToken);
        setUser({ id: decoded.id });
        localStorage.setItem('token', newToken);
        resolve();
      } catch (e) {
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

export const useAuth = () => {
  return useContext(AuthContext);
};