
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Plus, Calendar, Loader2 } from 'lucide-react';

const ClassesIndex = () => {
  const { user } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Simulate page content loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main content */}
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
                
                <Button asChild>
                  <Link to="/classes/schedule" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Schedule New Class</span>
                  </Link>
                </Button>
              </div>
              
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Upcoming Classes</CardTitle>
                  <CardDescription>View and manage your scheduled cooking classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto text-blue-400 mb-4" />
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
