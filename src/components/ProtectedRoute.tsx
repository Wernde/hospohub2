
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  redirectPath?: string;
  requireAdmin?: boolean;
  requireOrgAccess?: boolean;
  requiredOrgAccessLevel?: number;
}

const ProtectedRoute = ({ 
  redirectPath = "/auth",
  requireAdmin = false,
  requireOrgAccess = false,
  requiredOrgAccessLevel = 1
}: ProtectedRouteProps) => {
  const { user, isLoading, isAdmin, activeOrganization, canUserPerformAction } = useAuth();
  const location = useLocation();
  const params = useParams();

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

  // If route requires organization access
  if (requireOrgAccess) {
    // If no active organization
    if (!activeOrganization) {
      return <Navigate to="/dashboard" replace />;
    }

    // Check if user has required access level
    const hasAccessLevel = canUserPerformAction(
      activeOrganization.id, 
      requiredOrgAccessLevel
    );

    if (!hasAccessLevel) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If authenticated (and has necessary role if applicable), render the outlet (child route components)
  return <Outlet />;
};

export default ProtectedRoute;
