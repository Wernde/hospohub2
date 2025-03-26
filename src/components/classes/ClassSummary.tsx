
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Clock, Calendar, MapPin, ChefHat, Users } from 'lucide-react';

// Define class details interface
interface ClassSummaryProps {
  className: string;
  instructor: string;
  location: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  description: string;
  selectedRecipes: {
    id: string;
    name: string;
    difficulty: string;
    prepTime: number;
    cookTime: number;
    servings: number;
  }[];
  students: {
    id: string;
    name: string;
    email: string;
    dietaryRequirements: string[];
    allergies: string[];
    notes?: string;
  }[];
}

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
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-blue-800">{className}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="font-semibold text-lg">Class Details</div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{date ? format(date, 'PPPP') : 'No date selected'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{startTime} - {endTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Instructor: {instructor}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="font-semibold text-lg">Participant Information</div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm">{students.length} student{students.length !== 1 ? 's' : ''} enrolled</span>
            </div>
            {students.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {students.filter(s => s.dietaryRequirements.length > 0 || s.allergies.length > 0).length} student(s) with dietary requirements
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedRecipes.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Recipes ({selectedRecipes.length})</h3>
          <div className="space-y-2">
            {selectedRecipes.map((recipe) => (
              <div key={recipe.id} className="p-3 border rounded-md bg-blue-50">
                <div className="font-medium">{recipe.name}</div>
                <div className="text-sm text-gray-500">
                  {recipe.difficulty} • {recipe.prepTime + recipe.cookTime} min • {recipe.servings} servings
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {students.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Students ({students.length})</h3>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {students.map((student) => (
              <div key={student.id} className="p-3 border rounded-md">
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-gray-500">{student.email}</div>
                {(student.dietaryRequirements.length > 0 || student.allergies.length > 0) && (
                  <div className="mt-2 space-y-1">
                    {student.dietaryRequirements.length > 0 && (
                      <div className="text-xs">
                        <span className="font-semibold">Dietary: </span>
                        {student.dietaryRequirements.join(', ')}
                      </div>
                    )}
                    {student.allergies.length > 0 && (
                      <div className="text-xs">
                        <span className="font-semibold">Allergies: </span>
                        {student.allergies.join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSummary;
