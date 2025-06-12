
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import UpcomingClasses from '@/components/dashboard/UpcomingClasses';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import AdminCard from '@/components/dashboard/AdminCard';

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

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
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
            <UpcomingClasses />
            <RecentActivity />
          </div>
          
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Admin Link if user is admin */}
          {isAdmin && <AdminCard />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
