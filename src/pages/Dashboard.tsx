
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, Users, CreditCard, Activity } from 'lucide-react';

// Sample data for dashboard
const sampleData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 19 },
  { name: 'Mar', value: 3 },
  { name: 'Apr', value: 5 },
  { name: 'May', value: 2 },
  { name: 'Jun', value: 13 },
];

const statCards = [
  {
    title: 'Total Users',
    value: '2,853',
    description: '7% increase from last week',
    icon: <Users className="h-6 w-6 text-blue-500" />,
  },
  {
    title: 'Revenue',
    value: '$45,231',
    description: '12% increase from last month',
    icon: <CreditCard className="h-6 w-6 text-green-500" />,
  },
  {
    title: 'Active Users',
    value: '1,294',
    description: '5% increase from yesterday',
    icon: <Activity className="h-6 w-6 text-purple-500" />,
  }
];

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <LayoutDashboard className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                  <div className="bg-blue-50 p-2 rounded-full">{stat.icon}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Monthly Activity</CardTitle>
              <CardDescription>User engagement over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sampleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4c8bf5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Admin Link if user is admin */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Controls</CardTitle>
                <CardDescription>Access your admin dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">You have admin privileges. You can access the admin dashboard to manage users and system settings.</p>
                <a 
                  href="/admin" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Go to Admin Dashboard
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
