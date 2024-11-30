import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/check-auth`, {}, {
          withCredentials: true
        });
        setIsAuthenticated(response.status === 201);
      } catch (error) {
        console.error('Auth check failed:', error); 
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  console.log('Is Authenticated:', isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login"/>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
