
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import RecipePageHeader from '@/components/recipes/RecipePageHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClassDetailsForm from '@/components/classes/ClassDetailsForm';
import RecipeSelectionTab from '@/components/classes/RecipeSelectionTab';
import StudentsTab from '@/components/classes/StudentsTab';

// Define student type
interface Student {
  id: string;
  name: string;
  email: string;
  dietaryRequirements: string[];
  allergies: string[];
  notes?: string;
}

// Mock recipe data
interface Recipe {
  id: string;
  name: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
}

interface ClassDetailsFormData {
  className: string;
  instructor: string;
  location: string;
  startTime: string;
  endTime: string;
  description: string;
}

const mockRecipes: Recipe[] = [
  { id: '1', name: 'Classic Chocolate Cake', difficulty: 'Medium', prepTime: 30, cookTime: 45, servings: 12 },
  { id: '2', name: 'Vegetable Stir Fry', difficulty: 'Easy', prepTime: 15, cookTime: 10, servings: 4 },
  { id: '3', name: 'Beef Wellington', difficulty: 'Hard', prepTime: 60, cookTime: 45, servings: 6 },
  { id: '4', name: 'Pasta Carbonara', difficulty: 'Medium', prepTime: 15, cookTime: 15, servings: 4 },
  { id: '5', name: 'Apple Pie', difficulty: 'Medium', prepTime: 45, cookTime: 50, servings: 8 },
];

const ScheduleClass = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [students, setStudents] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [classDetails, setClassDetails] = useState<ClassDetailsFormData>({
    className: '',
    instructor: '',
    location: '',
    startTime: '',
    endTime: '',
    description: '',
  });
  const { toast } = useToast();

  const handleFormData = (data: ClassDetailsFormData) => {
    setClassDetails(data);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here we would save the class data including student information and recipes
    toast({
      title: "Class scheduled",
      description: `${classDetails.className} has been scheduled with ${students.length} student(s) and ${selectedRecipes.length} recipe(s)`,
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Class Details</TabsTrigger>
              <TabsTrigger value="recipes">Recipe Selection</TabsTrigger>
              <TabsTrigger value="students">Students & Summary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card className="shadow-md">
                <CardHeader className="bg-gradient-to-r from-rgba(0, 0, 0, 0.12)-50 to-rgba(0, 0, 0, 0.12)-100 border-b">
                  <CardTitle className="text-xl text-rgba(0, 0, 0, 0.12)-800">Class Details</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ClassDetailsForm 
                    date={date}
                    setDate={setDate}
                    onNavigateBack={() => navigate('/classes')}
                    onNavigateNext={() => setActiveTab('recipes')}
                    onFormData={handleFormData}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recipes">
              <Card className="shadow-md mb-6">
                <CardHeader className="bg-gradient-to-r from-rgba(0, 0, 0, 0.12)-50 to-rgba(0, 0, 0, 0.12)-100 border-b">
                  <CardTitle className="text-xl text-rgba(0, 0, 0, 0.12)-800">Recipe Selection</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <RecipeSelectionTab
                    selectedRecipes={selectedRecipes}
                    setSelectedRecipes={setSelectedRecipes}
                    mockRecipes={mockRecipes}
                    onNavigateBack={() => setActiveTab('details')}
                    onNavigateNext={() => setActiveTab('students')}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="students">
              <Card className="shadow-md mb-6">
                <CardHeader className="bg-gradient-to-r from-rgba(0, 0, 0, 0.12)-50 to-rgba(0, 0, 0, 0.12)-100 border-b">
                  <CardTitle className="text-xl text-rgba(0, 0, 0, 0.12)-800">Students & Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <StudentsTab
                    students={students}
                    setStudents={setStudents}
                    onNavigateBack={() => setActiveTab('recipes')}
                    onSubmit={handleSubmit}
                    classDetails={classDetails}
                    date={date}
                    selectedRecipes={selectedRecipes}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScheduleClass;
