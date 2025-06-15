
import { useState, useEffect, Suspense, lazy } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy components
const UpcomingClasses = lazy(() => import('@/components/dashboard/UpcomingClasses'));
const RecentActivity = lazy(() => import('@/components/dashboard/RecentActivity'));
const QuickActions = lazy(() => import('@/components/dashboard/QuickActions'));
const AdminCard = lazy(() => import('@/components/dashboard/AdminCard'));

const Dashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );

  // Show loading while auth is being determined
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-stone-600 mx-auto mb-4" />
          <p className="text-lg text-stone-800">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <Navbar />
      
      {/* Main content with smooth transition */}
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16 page-transition">
        <div className="max-w-7xl mx-auto text-black">
          {/* Dashboard Header */}
          <DashboardHeader />
          
          {/* Stats Cards */}
          <StatsCards />
          
          {/* Upcoming Classes and Recent Activity */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
            <Suspense fallback={<LoadingSkeleton />}>
              <UpcomingClasses />
            </Suspense>
            <Suspense fallback={<LoadingSkeleton />}>
              <RecentActivity />
            </Suspense>
          </div>
          
          {/* Quick Actions */}
          <Suspense fallback={<Skeleton className="h-48 w-full" />}>
            <QuickActions />
          </Suspense>
          
          {/* Admin Link if user is admin */}
          {isAdmin && (
            <Suspense fallback={<Skeleton className="h-24 w-full mt-8" />}>
              <AdminCard />
            </Suspense>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
