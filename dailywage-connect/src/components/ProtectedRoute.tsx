import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireWorker?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireWorker = false 
}) => {
  const { state } = useAppContext();
  const location = useLocation();

  if (!state.isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireWorker && state.user?.type !== 'worker') {
    // Redirect to home if user is not a worker but route requires worker access
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;