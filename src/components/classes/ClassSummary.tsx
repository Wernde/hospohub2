
import React from 'react';
import { ClassSummaryProps } from './summary/types';
import ClassDetailCard from './summary/ClassDetailCard';
import ParticipantCard from './summary/ParticipantCard';
import RecipeList from './summary/RecipeList';
import StudentList from './summary/StudentList';

const ClassSummary: React.FC<ClassSummaryProps> = ({
  className,
  instructor,
  location,
  date,
  startTime,
  endTime,
  description,
  selectedRecipes,
  students
}) => {
  // Calculate the number of students with dietary requirements or allergies
  const dietaryRequirementsCount = students.filter(
    s => s.dietaryRequirements.length > 0 || s.allergies.length > 0
  ).length;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-blue-800">{className}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ClassDetailCard
          className={className}
          instructor={instructor}
          location={location}
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
        
        <ParticipantCard
          studentCount={students.length}
          dietaryRequirementsCount={dietaryRequirementsCount}
        />
      </div>

      <RecipeList recipes={selectedRecipes} />
      <StudentList students={students} />
    </div>
  );
};

export default ClassSummary;
