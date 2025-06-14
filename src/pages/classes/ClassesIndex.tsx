
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Plus, Calendar } from 'lucide-react';

const ClassesIndex = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
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
              <CardTitle>My Classes</CardTitle>
              <CardDescription>Manage your cooking classes and workshops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Classes Scheduled</h3>
                <p className="text-gray-500 mb-4">Start by scheduling your first cooking class</p>
                <Button asChild>
                  <Link to="/classes/schedule">Schedule Class</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClassesIndex;
