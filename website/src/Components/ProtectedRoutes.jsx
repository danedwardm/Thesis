import React from 'react';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const ProtectedRoutes = () => {
  return (
    <ProtectedRoute>
      <Outlet />  
    </ProtectedRoute>
  );
};

export default ProtectedRoutes;