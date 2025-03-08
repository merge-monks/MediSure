import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here (clear localStorage/session if any)
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Home Page</h1>
    </div>
  );
};

export default Home;
