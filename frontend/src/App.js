import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';

// Pages
import PublicWebsite from './pages/PublicWebsite';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import FinanceDashboard from './pages/FinanceDashboard';

// Components
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setUserRole(userData.role);
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicWebsite />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
        
        <Route
          path="/admin/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="ADMIN">
              <AdminDashboard setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/finance/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="FINANCE">
              <FinanceDashboard setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
