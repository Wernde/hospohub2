
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CalendarIcon, ArrowLeft, Upload, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import RecipePageHeader from '@/components/recipes/RecipePageHeader';
import StudentDataImport from '@/components/classes/StudentDataImport';
import DietaryRequirementsForm from '@/components/classes/DietaryRequirementsForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define student type
interface Student {
  id: string;
  name: string;
  email: string;
  dietaryRequirements: string[];
  allergies: string[];
  notes?: string;
}

const ScheduleClass = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [students, setStudents] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState('details');
  const { toast } = useToast();
  const form = useForm();

  const handleStudentDataImport = (importedStudents: Student[]) => {
    setStudents(prevStudents => {
      // Merge with existing students, avoiding duplicates by id
      const existingIds = new Set(prevStudents.map(s => s.id));
      const newStudents = importedStudents.filter(s => !existingIds.has(s.id));
      
      toast({
        title: `Imported ${newStudents.length} students`,
        description: "Student data has been successfully imported",
      });
      
      return [...prevStudents, ...newStudents];
    });
  };

  const handleRemoveStudent = (studentId: string) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here we would save the class data including student information
    toast({
      title: "Class scheduled",
      description: `Class has been scheduled with ${students.length} student(s)`,
    });
    navigate('/classes');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <RecipePageHeader title="Schedule a Class" />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Class Details</TabsTrigger>
              <TabsTrigger value="students">Students & Dietary Requirements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card className="shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                  <CardTitle className="text-xl text-blue-800">Class Details</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="className">Class Name</Label>
                          <Input id="className" placeholder="Enter class name" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input id="startTime" type="time" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="endTime">End Time</Label>
                          <Input id="endTime" type="time" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Enter location" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Enter class description" 
                          className="min-h-[100px]" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="recipes">Recipes (Coming Soon)</Label>
                        <div className="p-4 border rounded-md bg-blue-50/50 text-blue-600 text-sm">
                          Recipe selection will be available in a future update. This will allow you to assign recipes from your collection to classes.
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate('/classes')}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => setActiveTab('students')}
                      >
                        Next: Add Students
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="students">
              <Card className="shadow-md mb-6">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                  <CardTitle className="text-xl text-blue-800">
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Students & Dietary Requirements
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <StudentDataImport onImport={handleStudentDataImport} />
                  
                  {students.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Imported Students ({students.length})</h3>
                      <Accordion type="multiple" className="w-full">
                        {students.map((student) => (
                          <AccordionItem key={student.id} value={student.id}>
                            <AccordionTrigger className="hover:bg-blue-50/50 px-3 rounded-md">
                              <div className="flex justify-between w-full pr-4">
                                <span>{student.name}</span>
                                <span className="text-sm text-gray-500">{student.email}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4">
                              <div className="space-y-4 pt-2">
                                <div>
                                  <Label className="text-sm text-gray-500">Dietary Requirements</Label>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {student.dietaryRequirements.length > 0 ? 
                                      student.dietaryRequirements.map((item, i) => (
                                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                          {item}
                                        </span>
                                      )) : 
                                      <span className="text-gray-500 text-sm">None specified</span>
                                    }
                                  </div>
                                </div>
                                
                                <div>
                                  <Label className="text-sm text-gray-500">Allergies</Label>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {student.allergies.length > 0 ? 
                                      student.allergies.map((item, i) => (
                                        <span key={i} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                          {item}
                                        </span>
                                      )) : 
                                      <span className="text-gray-500 text-sm">None specified</span>
                                    }
                                  </div>
                                </div>
                                
                                {student.notes && (
                                  <div>
                                    <Label className="text-sm text-gray-500">Notes</Label>
                                    <p className="text-sm mt-1">{student.notes}</p>
                                  </div>
                                )}
                                
                                <div className="pt-2">
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleRemoveStudent(student.id)}
                                  >
                                    Remove Student
                                  </Button>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Manually Add Students</h3>
                    <DietaryRequirementsForm 
                      onSubmit={(student) => {
                        setStudents(prev => [...prev, {
                          ...student,
                          id: `manual-${Date.now()}`,
                        }]);
                        toast({
                          title: "Student added",
                          description: `${student.name} has been added to the class`,
                        });
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab('details')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Details
                </Button>
                
                <Button 
                  type="submit"
                  onClick={handleSubmit}
                >
                  Schedule Class
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScheduleClass;
