
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, BookOpen, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ClassesIndex = () => {
  const navigate = useNavigate();

  // This would normally come from an API
  const upcomingClasses = [
    {
      id: 1,
      title: 'Pasta Making Basics',
      date: '2023-11-15T14:00:00',
      location: 'Kitchen Studio A',
      students: 12,
      recipes: 3
    },
    {
      id: 2,
      title: 'Advanced Pastry Techniques',
      date: '2023-11-18T10:00:00',
      location: 'Bakery Lab',
      students: 8,
      recipes: 4
    },
    {
      id: 3,
      title: 'Asian Fusion Cooking',
      date: '2023-11-22T16:00:00',
      location: 'Kitchen Studio B',
      students: 15,
      recipes: 5
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Cooking Classes</h1>
              <p className="text-gray-600 mt-1">Manage your scheduled cooking classes</p>
            </div>
            <Button 
              onClick={() => navigate('/classes/schedule')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Schedule Class
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            {upcomingClasses.map((classItem) => (
              <Card key={classItem.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b pb-4">
                  <CardTitle className="text-xl text-blue-800">{classItem.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-blue-800">
                      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">
                          {new Date(classItem.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(classItem.date).toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-blue-800">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">{classItem.students} Students</p>
                        <p className="text-sm text-gray-500">{classItem.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-blue-800">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">{classItem.recipes} Recipes</p>
                        <p className="text-sm text-gray-500">Assigned to class</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mr-2"
                      onClick={() => navigate(`/classes/edit/${classItem.id}`)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/classes/view/${classItem.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClassesIndex;
