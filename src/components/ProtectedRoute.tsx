
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  redirectPath?: string;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ 
  redirectPath = "/auth",
  requireAdmin = false
}: ProtectedRouteProps) => {
  const { user, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  // If route requires admin but user is not admin
  if (requireAdmin && !isAdmin) {
    // For admin routes, redirect to home if not admin
    return <Navigate to="/" replace />;
  }

  // If authenticated (and has necessary role if applicable), render the outlet (child route components)
  return <Outlet />;
};

export default ProtectedRoute;
