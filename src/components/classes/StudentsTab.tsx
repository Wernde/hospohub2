
import React from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import StudentDataImport from '@/components/classes/StudentDataImport';
import DietaryRequirementsForm from '@/components/classes/DietaryRequirementsForm';

interface Student {
  id: string;
  name: string;
  email: string;
  dietaryRequirements: string[];
  allergies: string[];
  notes?: string;
}

interface StudentsTabProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onNavigateBack: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

const StudentsTab: React.FC<StudentsTabProps> = ({
  students,
  setStudents,
  onNavigateBack,
  onSubmit
}) => {
  const { toast } = useToast();

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

  return (
    <div>
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
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onNavigateBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Recipes
        </Button>
        
        <Button 
          type="submit"
          onClick={onSubmit}
        >
          Schedule Class
        </Button>
      </div>
    </div>
  );
};

export default StudentsTab;
