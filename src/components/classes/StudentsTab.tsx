
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileUp, ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DietaryRequirementsForm from './DietaryRequirementsForm';
import StudentDataImport from './StudentDataImport';
import ClassSummary from './ClassSummary';

// Define student type
interface Student {
  id: string;
  name: string;
  email: string;
  dietaryRequirements: string[];
  allergies: string[];
  notes?: string;
}

// Define recipe type
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

interface StudentsTabProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onNavigateBack: () => void;
  onSubmit: (event: React.FormEvent) => void;
  classDetails: ClassDetailsFormData;
  date: Date | undefined;
  selectedRecipes: Recipe[];
}

const StudentsTab: React.FC<StudentsTabProps> = ({
  students,
  setStudents,
  onNavigateBack,
  onSubmit,
  classDetails,
  date,
  selectedRecipes
}) => {
  const [activeTab, setActiveTab] = useState<string>('add');
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const { toast } = useToast();

  const handleAddStudent = (student: Student) => {
    if (students.some(s => s.email === student.email)) {
      toast({
        title: "Student already exists",
        description: "A student with this email already exists in the class.",
        variant: "destructive",
      });
      return;
    }
    
    setStudents([...students, student]);
    toast({
      title: "Student added",
      description: `${student.name} has been added to the class`,
    });
  };

  const handleRemoveStudent = (studentId: string) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  const handleImportStudents = (importedStudents: Student[]) => {
    // Filter out duplicates
    const uniqueStudents = importedStudents.filter(
      importedStudent => !students.some(existingStudent => existingStudent.email === importedStudent.email)
    );
    
    if (uniqueStudents.length > 0) {
      setStudents([...students, ...uniqueStudents]);
      toast({
        title: "Students imported",
        description: `${uniqueStudents.length} student(s) have been imported`,
      });
    } else {
      toast({
        title: "No new students",
        description: "All imported students already exist in the class",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {!showSummary ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="add">Add Student</TabsTrigger>
                <TabsTrigger value="import">Import Students</TabsTrigger>
              </TabsList>
              
              <TabsContent value="add" className="pt-4">
                <DietaryRequirementsForm onAddStudent={handleAddStudent} />
              </TabsContent>
              
              <TabsContent value="import" className="pt-4">
                <StudentDataImport onImport={handleImportStudents} />
              </TabsContent>
            </Tabs>
          </div>
          
          {students.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Students ({students.length})</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {students.map((student) => (
                  <div 
                    key={student.id}
                    className="flex justify-between items-start p-4 border rounded-lg bg-white shadow-sm"
                  >
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                      {(student.dietaryRequirements.length > 0 || student.allergies.length > 0) && (
                        <div className="mt-1 text-xs text-gray-500">
                          {student.dietaryRequirements.length > 0 && (
                            <div><span className="font-medium">Dietary:</span> {student.dietaryRequirements.join(', ')}</div>
                          )}
                          {student.allergies.length > 0 && (
                            <div><span className="font-medium">Allergies:</span> {student.allergies.join(', ')}</div>
                          )}
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      onClick={() => handleRemoveStudent(student.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onNavigateBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recipes
            </Button>
            
            <Button 
              type="button"
              onClick={() => setShowSummary(true)}
            >
              Review Summary
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <ClassSummary
            className={classDetails.className}
            instructor={classDetails.instructor}
            location={classDetails.location}
            date={date}
            startTime={classDetails.startTime}
            endTime={classDetails.endTime}
            description={classDetails.description}
            selectedRecipes={selectedRecipes}
            students={students}
          />
          
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowSummary(false)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Students
            </Button>
            
            <Button 
              type="submit"
              onClick={onSubmit}
            >
              <Save className="h-4 w-4 mr-2" />
              Schedule Class
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsTab;
