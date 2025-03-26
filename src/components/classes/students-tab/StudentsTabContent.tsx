
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Student } from '../dietary-form/types';
import ImportOptions from './ImportOptions';
import StudentList from './StudentList';
import NavigationButtons from './NavigationButtons';
import ClassSummary from '../ClassSummary';
import { StudentsTabProps } from './types';

const StudentsTabContent: React.FC<StudentsTabProps> = ({
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

  if (showSummary) {
    return (
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
        
        <NavigationButtons 
          onNavigateBack={onNavigateBack}
          showSummary={showSummary} 
          setShowSummary={setShowSummary}
          onSubmit={onSubmit}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ImportOptions
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddStudent={handleAddStudent}
        onImportStudents={handleImportStudents}
      />
      
      <StudentList 
        students={students} 
        onRemoveStudent={handleRemoveStudent} 
      />
      
      <NavigationButtons 
        onNavigateBack={onNavigateBack}
        showSummary={showSummary} 
        setShowSummary={setShowSummary}
      />
    </div>
  );
};

export default StudentsTabContent;
