
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

function App() {
  return (
    <BrowserRouter>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
