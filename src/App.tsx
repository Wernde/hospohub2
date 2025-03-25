
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AiChat from "@/components/AiChat";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import OrganizationCreate from "./pages/organization/OrganizationCreate";
import OrganizationSettings from "./pages/organization/OrganizationSettings";
import OrganizationMembers from "./pages/organization/OrganizationMembers";

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient();

// Component to render the AI assistant only when user is authenticated
const AuthenticatedAIAssistant = () => {
  const { user } = useAuth();
  return user ? <AiChat /> : null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes (requires any authenticated user) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/organization/create" element={<OrganizationCreate />} />
              
              {/* Organization routes (requires org membership) */}
              <Route element={<ProtectedRoute requireOrgAccess={true} requiredOrgAccessLevel={1} />}>
                {/* Organization admin routes */}
                <Route element={<ProtectedRoute requireOrgAccess={true} requiredOrgAccessLevel={3} />}>
                  <Route path="/organization/settings" element={<OrganizationSettings />} />
                </Route>
                
                {/* Organization manager routes */}
                <Route element={<ProtectedRoute requireOrgAccess={true} requiredOrgAccessLevel={2} />}>
                  <Route path="/organization/members" element={<OrganizationMembers />} />
                </Route>
              </Route>
            </Route>
            
            {/* Protected admin routes (requires admin role) */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AuthenticatedAIAssistant />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
