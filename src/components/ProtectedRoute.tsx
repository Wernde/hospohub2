
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute = ({ redirectPath = "/auth" }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated, render the outlet (child route components)
  return <Outlet />;
};

export default ProtectedRoute;
