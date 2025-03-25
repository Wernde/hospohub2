
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Clock, 
  ChefHat,
  BookOpen, 
  GraduationCap,
  ShoppingCart,
  Package,
  Calendar,
  Plus,
  MessageSquare
} from 'lucide-react';

// Sample data for dashboard
const sampleData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 19 },
  { name: 'Mar', value: 3 },
  { name: 'Apr', value: 5 },
  { name: 'May', value: 2 },
  { name: 'Jun', value: 13 },
];

// Upcoming classes data
const upcomingClasses = [
  {
    id: 1,
    title: 'Foundations of Pastry',
    time: '9:00 AM - 12:00 PM',
    location: 'Kitchen 3',
    status: 'Today'
  },
  {
    id: 2,
    title: 'Advanced Culinary Techniques',
    time: '1:00 PM - 4:00 PM',
    location: 'Kitchen 2',
    status: 'Tomorrow'
  },
  {
    id: 3,
    title: 'International Cuisine',
    time: '10:00 AM - 2:00 PM',
    location: 'Kitchen 1',
    status: 'Mar 24'
  }
];

// Recent activity data
const recentActivities = [
  {
    id: 1,
    title: 'New recipe added: Chocolate Soufflé',
    time: 'Added by you - 2 hours ago',
    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
    iconBg: 'bg-blue-100'
  },
  {
    id: 2,
    title: 'New class scheduled: Bread Fundamentals',
    time: 'Scheduled by Admin - Yesterday',
    icon: <Calendar className="h-6 w-6 text-green-600" />,
    iconBg: 'bg-green-100'
  },
  {
    id: 3,
    title: 'Pantry inventory updated',
    time: 'Updated by Kitchen Staff - 2 days ago',
    icon: <Package className="h-6 w-6 text-red-600" />,
    iconBg: 'bg-red-100'
  }
];

// Quick actions
const quickActions = [
  {
    id: 1,
    title: 'Add New Recipe',
    description: 'Upload a new recipe with AI-assisted ingredient extraction.',
    icon: <Plus className="h-6 w-6 text-white" />,
    iconBg: 'bg-blue-500',
    href: '/recipes/new'
  },
  {
    id: 2,
    title: 'Schedule Class',
    description: 'Create a new class session and assign recipes to it.',
    icon: <Calendar className="h-6 w-6 text-white" />,
    iconBg: 'bg-green-500',
    href: '/classes/schedule'
  },
  {
    id: 3,
    title: 'Ingredient Calculator',
    description: 'Calculate ingredient quantities for different class sizes.',
    icon: <MessageSquare className="h-6 w-6 text-white" />,
    iconBg: 'bg-yellow-500',
    href: '/calculator'
  }
];

// Stats cards data
const statsCards = [
  {
    title: 'Total Recipes',
    value: '42',
    description: 'View all recipes',
    icon: <BookOpen className="h-6 w-6 text-white" />,
    iconBg: 'bg-blue-500',
    href: '/recipes'
  },
  {
    title: 'Active Classes',
    value: '6',
    description: 'View all classes',
    icon: <GraduationCap className="h-6 w-6 text-white" />,
    iconBg: 'bg-green-500',
    href: '/classes'
  },
  {
    title: 'Total Students',
    value: '138',
    description: 'Manage students',
    icon: <Users className="h-6 w-6 text-white" />,
    iconBg: 'bg-yellow-500',
    href: '/students'
  },
  {
    title: 'Pantry Items',
    value: '204',
    description: 'View pantry',
    icon: <Package className="h-6 w-6 text-white" />,
    iconBg: 'bg-red-500',
    href: '/pantry'
  }
];

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Navigation links for dashboard
  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', current: true, icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Recipes', href: '/recipes', current: false, icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Classes', href: '/classes', current: false, icon: <GraduationCap className="h-5 w-5" /> },
    { name: 'Pantry', href: '/pantry', current: false, icon: <Package className="h-5 w-5" /> },
    { name: 'Shopping', href: '/shopping', current: false, icon: <ShoppingCart className="h-5 w-5" /> }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Navigation for Dashboard */}
          <div className="hidden md:flex mb-8 space-x-8 border-b border-blue-100 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center px-1 pt-1 text-sm font-medium ${
                  link.current 
                    ? "border-blue-500 text-blue-700 border-b-2" 
                    : "border-transparent text-blue-400 hover:border-blue-300 hover:text-blue-600 border-b-2"
                }`}
              >
                {link.icon}
                <span className="ml-1">{link.name}</span>
              </Link>
            ))}
          </div>
          
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-blue-900">Dashboard</h1>
            <p className="mt-2 text-sm text-blue-600">Welcome to HospoHub, your culinary education management platform.</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 ${stat.iconBg} rounded-md p-3`}>
                      {stat.icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-blue-500 truncate">{stat.title}</dt>
                        <dd>
                          <div className="text-lg font-semibold text-blue-900">{stat.value}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link to={stat.href} className="font-medium text-blue-600 hover:text-blue-700">
                      {stat.description}
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Upcoming Classes and Recent Activity */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
            {/* Upcoming Classes */}
            <Card className="shadow overflow-hidden">
              <CardHeader className="px-4 py-5 border-b border-blue-100 sm:px-6">
                <CardTitle className="text-lg text-blue-900">Upcoming Classes</CardTitle>
              </CardHeader>
              <ul className="divide-y divide-blue-100">
                {upcomingClasses.map((cls) => (
                  <li key={cls.id}>
                    <Link to="#" className="block hover:bg-blue-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-blue-600 truncate">{cls.title}</div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              cls.status === 'Today' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {cls.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <div className="sm:flex">
                            <div className="flex items-center text-sm text-blue-500">
                              <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-400" />
                              <p>{cls.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-blue-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <p>{cls.location}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow overflow-hidden">
              <CardHeader className="px-4 py-5 border-b border-blue-100 sm:px-6">
                <CardTitle className="text-lg text-blue-900">Recent Activity</CardTitle>
              </CardHeader>
              <ul className="divide-y divide-blue-100">
                {recentActivities.map((activity) => (
                  <li key={activity.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="flex-shrink-0">
                            <div className={`h-10 w-10 rounded-full ${activity.iconBg} flex items-center justify-center`}>
                              {activity.icon}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 px-4">
                            <p className="text-sm font-medium text-blue-600 truncate">{activity.title}</p>
                            <p className="mt-1 text-sm text-blue-500">{activity.time}</p>
                          </div>
                        </div>
                        <div>
                          <Link to="#" className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-blue-300 text-sm leading-5 font-medium rounded-full text-blue-700 bg-white hover:bg-blue-50">
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <Card className="shadow overflow-hidden mb-8">
            <CardHeader className="px-4 py-5 border-b border-blue-100 sm:px-6">
              <CardTitle className="text-lg text-blue-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Link 
                    key={action.id}
                    to={action.href} 
                    className="group relative bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${action.iconBg} flex items-center justify-center`}>
                        {action.icon}
                      </div>
                      <h4 className="text-base font-semibold text-blue-900 group-hover:text-blue-700">
                        {action.title}
                      </h4>
                    </div>
                    <p className="mt-2 text-sm text-blue-600">{action.description}</p>
                  </Link>
                ))}
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
                <Link 
                  to="/admin" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Go to Admin Dashboard
                </Link>
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
