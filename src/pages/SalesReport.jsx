import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function SalesReport() {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Make sure we include credentials (cookies)
    api.get('/api/sales', { withCredentials: true })
      .then(res => {
        if (res.data.sales) {
          setSales(res.data.sales);
        } else {
          setError('No sales data found.');
        }
      })
      .catch(err => {
        console.error('Sales fetch error:', err);
        if (err.response?.status === 401) {
          setError('❌ Unauthorized: Please log in again.');
        } else if (err.response?.status === 403) {
          setError('⚠️ Forbidden: Admin access only.');
        } else {
          setError('Something went wrong while loading sales data.');
        }
      });
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Sales Report (Admin Only)</h2>

      {error && <p className="alert">{error}</p>}

      {!error && (
        <ul style={{ textAlign: 'left' }}>
          {sales.map((s) => (
            <li key={s.id}>{s.product} — ${s.amount}</li>
          ))}
        </ul>
      )}

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
