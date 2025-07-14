import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    
    try {
      return token && userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.warn(' Invalid JSON in localStorage user', e);
      localStorage.removeItem('user');
      return null;
    }
  });

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};