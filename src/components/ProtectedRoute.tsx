import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useAuthStore } from '../lib/store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const isApproved = useAuthStore((state) => state.isApproved);

  if (!isConnected || !isApproved) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;