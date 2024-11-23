import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { accessToken, checkemail } from './API/Api';
import { useNavigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
  const navigate = useNavigate();

  // Step 1: Check if the user is authenticated
  const { data: isAuthenticated, isLoading: isAuthLoading, isError: isAuthError } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: accessToken,
    retry: false,
  });

  // Step 2: Check if the user's email is verified (only if authenticated)
  const { data: isEmailVerified, isLoading: isEmailLoading, isError: isEmailError } = useQuery({
    queryKey: ['isEmailVerified'],
    queryFn: checkemail,
    enabled: !!isAuthenticated, // Run only if authenticated
    retry: false,
  });

  useEffect(() => {
    // Redirect if authentication check fails
    if (!isAuthLoading && (isAuthError || !isAuthenticated)) {
      console.log("Redirecting to login page due to authentication failure.");
      navigate('/login');
    }
    // Redirect if email verification check fails
    else if (!isEmailLoading && !isAuthError && isAuthenticated && (isEmailError || !isEmailVerified)) {
      console.log("Redirecting to email verification page.");
      navigate('/verifyemail');
    }
  }, [isAuthLoading, isAuthError, isAuthenticated, isEmailLoading, isEmailError, isEmailVerified, navigate]);

  if (isAuthLoading || isEmailLoading) {
    return <div>Loading, please wait...</div>;
  }

  // Render protected content if both checks pass
  return <Outlet />;
}

export default ProtectedRoutes;
