import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, userType }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to={userType === 'admin' ? '/admin/login' : '/login'} replace />;
  }

  if (userType && user.type !== userType) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;