
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
  const { user, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Prevent navigation away from dashboard when logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth', { replace: true });
    }
  }, [user, navigate]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
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
