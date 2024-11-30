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
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="mt-4 text-xl font-semibold text-blue-400">Loading your expenses...</h2>
          <p className="mt-2 text-blue-300">Please wait while we verify your session</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login"/>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
