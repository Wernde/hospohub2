
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus, Calendar } from 'lucide-react';

const ClassesIndex = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-stone-600 mr-3" />
              <h1 className="text-2xl font-bold text-stone-900">Classes</h1>
            </div>
            
            <Button onClick={() => navigate('/classes/schedule')} className="bg-stone-600 hover:bg-stone-700">
              <Plus className="h-4 w-4 mr-2" />
              Schedule New Class
            </Button>
          </div>
          
          <Card className="mb-8 bg-stone-50 border-stone-200">
            <CardHeader>
              <CardTitle className="text-stone-900">My Classes</CardTitle>
              <CardDescription className="text-stone-600">Manage your cooking classes and workshops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-stone-400 mb-4" />
                <h3 className="text-lg font-medium mb-2 text-stone-900">No Classes Scheduled</h3>
                <p className="text-stone-500 mb-4">Start by scheduling your first cooking class</p>
                <Button onClick={() => navigate('/classes/schedule')} className="bg-stone-600 hover:bg-stone-700">
                  Schedule Class
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ClassesIndex;
