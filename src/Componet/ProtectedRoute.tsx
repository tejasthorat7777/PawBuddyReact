import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAccountType?: string;
  redirectTo?: string;
}

/**
 * ProtectedRoute component to guard routes that require authentication
 *
 * @param children - The component to render if authorized
 * @param requireAuth - Whether authentication is required (default: true)
 * @param requireAccountType - Specific account type required (e.g., 'business')
 * @param redirectTo - Where to redirect if not authorized (default: '/login')
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAccountType,
  redirectTo = "/login",
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontSize: "18px",
          color: "#667eea",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  // Check if authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if specific account type is required
  if (requireAccountType && user?.acc_type !== requireAccountType) {
    // Redirect to home page if user doesn't have required account type
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
