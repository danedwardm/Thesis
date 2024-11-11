import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';  // Import the useAuth hook

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useAuth();  // Get authentication status from context

  // Redirect to login if not authenticated, else render children (protected routes)
  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;