
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ScheduleClass = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    maxStudents: '',
    location: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally save to database
    toast({
      title: "Class Scheduled",
      description: "Your cooking class has been successfully scheduled.",
    });
    
    navigate('/classes');
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/classes">
              <Button variant="outline" className="flex items-center mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Classes
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-stone-900">Schedule New Class</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Class Details</CardTitle>
              <CardDescription>Fill in the information for your cooking class</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Class Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Italian Pasta Making"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what students will learn..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Start Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="2"
                      min="0.5"
                      step="0.5"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="maxStudents">Max Students</Label>
                    <Input
                      id="maxStudents"
                      name="maxStudents"
                      type="number"
                      value={formData.maxStudents}
                      onChange={handleInputChange}
                      placeholder="12"
                      min="1"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Kitchen Lab A"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" asChild>
                    <Link to="/classes">Cancel</Link>
                  </Button>
                  <Button type="submit" className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Schedule Class
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ScheduleClass;
