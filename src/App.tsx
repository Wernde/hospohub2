
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
import NotFound from "./pages/NotFound";
import PantryPage from './pages/pantry/PantryPage';
import ShoppingPage from './pages/pantry/ShoppingPage';
import PantrySettingsPage from './pages/pantry/PantrySettingsPage';
import OrdersPage from './pages/pantry/OrdersPage';
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ClassesIndex from "./pages/classes/ClassesIndex";
import ScheduleClass from "./pages/classes/ScheduleClass";
import RecipeIndex from "./pages/recipes/RecipeIndex";
import NewRecipe from "./pages/recipes/NewRecipe";
import RecipeTools from "./pages/recipes/RecipeTools";
import IngredientCalculator from "./pages/calculator/IngredientCalculator";
import AiChat from "./components/AiChat";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pantry" element={<PantryPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/pantry/settings" element={<PantrySettingsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          
          {/* Added missing routes */}
          <Route path="/classes" element={<ProtectedRoute><ClassesIndex /></ProtectedRoute>} />
          <Route path="/classes/schedule" element={<ProtectedRoute><ScheduleClass /></ProtectedRoute>} />
          <Route path="/recipes" element={<ProtectedRoute><RecipeIndex /></ProtectedRoute>} />
          <Route path="/recipes/new" element={<ProtectedRoute><NewRecipe /></ProtectedRoute>} />
          <Route path="/recipes/tools" element={<ProtectedRoute><RecipeTools /></ProtectedRoute>} />
          <Route path="/calculator" element={<ProtectedRoute><IngredientCalculator /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <AiChat />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
