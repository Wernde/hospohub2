
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Plus, Loader2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { exportClasses } from '@/utils/excelExport';
import ExportButton from '@/components/ui/export-button';

const ClassesIndex = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (user && !isPageLoading) {
      navigate('/dashboard');
    }
  }, [user, isPageLoading, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const mockClasses = [
    {
      id: '1',
      className: 'Italian Pasta Making',
      instructor: 'Chef Maria',
      location: 'Main Kitchen',
      date: new Date(2023, 6, 15),
      startTime: '10:00 AM',
      endTime: '12:30 PM',
      description: 'Learn to make authentic Italian pasta from scratch',
      studentCount: 12
    },
    {
      id: '2',
      className: 'French Pastry Basics',
      instructor: 'Chef Jean',
      location: 'Pastry Kitchen',
      date: new Date(2023, 6, 22),
      startTime: '2:00 PM',
      endTime: '5:00 PM',
      description: 'Master the art of French pastry making',
      studentCount: 8
    }
  ];

  const handleExportClasses = () => {
    exportClasses(mockClasses, 'cooking-classes');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          {isPageLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600">Loading classes...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
                  <h1 className="text-2xl font-bold text-blue-900">Cooking Classes</h1>
                </div>
                
                <div className="flex gap-2">
                  <ExportButton 
                    onExport={handleExportClasses}
                    label="Export"
                  />
                  <Button asChild>
                    <Link to="/classes/schedule" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Schedule New Class</span>
                    </Link>
                  </Button>
                </div>
              </div>
              
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Upcoming Classes</CardTitle>
                  <CardDescription>View and manage your scheduled cooking classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 mx-auto text-blue-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Classes Scheduled</h3>
                    <p className="text-gray-500 mb-4">Get started by scheduling your first cooking class</p>
                    <Button asChild>
                      <Link to="/classes/schedule">Schedule Class</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClassesIndex;
