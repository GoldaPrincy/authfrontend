import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSalesClick = () => {
    if (user?.role === 'admin') {
      navigate('/sales');
    } else {
      setError('❌ Admin access only!');
      setTimeout(() => setError(''), 3000); // clears message after 3s
    }
  };

  return (
    <div className="container">
      <h2>Welcome, {user?.name}</h2>
      <p>Your role: {user?.role}</p>

      <div className="button-group">
        <button
          className="btn-primary"
          onClick={handleSalesClick}
        >
          Go to Sales Report
        </button>

        <button
          className="btn-secondary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {error && <p className="alert">{error}</p>}
    </div>
  );
}
