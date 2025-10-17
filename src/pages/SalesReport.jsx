import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function SalesReport() {
  const [sales, setSales] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/sales')
      .then(res => setSales(res.data.sales))
      .catch(() => alert('Access denied'));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Sales Report (Admin Only)</h2>

      <ul style={{ textAlign: 'left' }}>
        {sales.map(s => (
          <li key={s.id}>{s.product} — ${s.amount}</li>
        ))}
      </ul>

      <div className="button-group">
        <button className="btn-secondary" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
        <button className="btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
