import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import ClassesIndex from "./pages/ClassesIndex";
import ScheduleClass from "./pages/ScheduleClass";
import OrganizationCreate from "./pages/OrganizationCreate";
import OrganizationMembers from "./pages/OrganizationMembers";
import OrganizationSettings from "./pages/OrganizationSettings";
import NotFound from "./pages/NotFound";
import RecipeIndex from "./pages/RecipeIndex";
import NewRecipe from "./pages/NewRecipe";
import RecipeTools from "./pages/RecipeTools";
import IngredientCalculator from "./pages/IngredientCalculator";
import PantryPage from './pages/pantry/PantryPage';
import ShoppingPage from './pages/pantry/ShoppingPage';
import PantrySettingsPage from './pages/pantry/PantrySettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/classes" element={<ProtectedRoute><ClassesIndex /></ProtectedRoute>} />
        <Route path="/classes/schedule" element={<ProtectedRoute><ScheduleClass /></ProtectedRoute>} />
        <Route path="/organization/create" element={<ProtectedRoute><OrganizationCreate /></ProtectedRoute>} />
        <Route path="/organization/members" element={<ProtectedRoute><OrganizationMembers /></ProtectedRoute>} />
        <Route path="/organization/settings" element={<ProtectedRoute><OrganizationSettings /></ProtectedRoute>} />
        <Route path="/pantry" element={<PantryPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/pantry/settings" element={<PantrySettingsPage />} />
        <Route path="/recipes" element={<ProtectedRoute><RecipeIndex /></ProtectedRoute>} />
        <Route path="/recipes/new" element={<ProtectedRoute><NewRecipe /></ProtectedRoute>} />
        <Route path="/recipes/tools" element={<ProtectedRoute><RecipeTools /></ProtectedRoute>} />
        <Route path="/calculator" element={<ProtectedRoute><IngredientCalculator /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!localStorage.getItem("sb-access-token")) {
    window.location.href = "/auth";
  }

  return children;
}

export default App;
