// components/Layout.js
import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <Header onLogout={handleLogout} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
