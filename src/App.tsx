
import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load heavy components
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const PantryPage = lazy(() => import('./pages/pantry/PantryPage'));
const ShoppingPage = lazy(() => import('./pages/pantry/ShoppingPage'));
const PantrySettingsPage = lazy(() => import('./pages/pantry/PantrySettingsPage'));
const OrdersPage = lazy(() => import('./pages/pantry/OrdersPage'));
const ClassesIndex = lazy(() => import("./pages/classes/ClassesIndex"));
const ScheduleClass = lazy(() => import("./pages/classes/ScheduleClass"));
const RecipeIndex = lazy(() => import("./pages/recipes/RecipeIndex"));
const NewRecipe = lazy(() => import("./pages/recipes/NewRecipe"));
const RecipeTools = lazy(() => import("./pages/recipes/RecipeTools"));
const IngredientCalculator = lazy(() => import("./pages/calculator/IngredientCalculator"));
const AiChat = lazy(() => import("./components/AiChat"));

// Loading fallback component
const PageSkeleton = () => (
  <div className="min-h-screen bg-gray-100 p-4">
    <Skeleton className="h-16 w-full mb-4" />
    <div className="container mx-auto">
      <Skeleton className="h-8 w-64 mb-6" />
      <Skeleton className="h-64 w-full mb-4" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter basename="/hospohub2">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/auth" element={<Auth />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Organization routes */}
          <Route path="/organization/create" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <OrganizationCreate />
              </Suspense>
            </ProtectedRoute>
          } />
          
          {/* Pantry routes */}
          <Route path="/pantry" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <PantryPage />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/shopping" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <ShoppingPage />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/pantry/settings" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <PantrySettingsPage />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <OrdersPage />
              </Suspense>
            </ProtectedRoute>
          } />
          
          {/* Classes routes */}
          <Route path="/classes" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <ClassesIndex />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/classes/schedule" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <ScheduleClass />
              </Suspense>
            </ProtectedRoute>
          } />
          
          {/* Recipe routes */}
          <Route path="/recipes" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <RecipeIndex />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/recipes/new" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <NewRecipe />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/recipes/tools" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <RecipeTools />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/calculator" element={
            <ProtectedRoute>
              <Suspense fallback={<PageSkeleton />}>
                <IngredientCalculator />
              </Suspense>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Suspense fallback={null}>
          <AiChat />
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
