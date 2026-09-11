import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, requiredRole, children }) => {
  const user = localStorage.getItem('user');
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  const userData = JSON.parse(user);
  
  if (requiredRole && userData.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default PrivateRoute;
