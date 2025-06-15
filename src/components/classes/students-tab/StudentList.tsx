
import React from 'react';
import { Button } from '@/components/ui/button';
import { Student } from '../dietary-form/types';
import { StudentListProps } from './types';

const StudentList: React.FC<StudentListProps> = ({ students, onRemoveStudent }) => {
  if (students.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-black">Students ({students.length})</h3>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {students.map((student) => (
          <div 
            key={student.id}
            className="flex justify-between items-start p-4 border rounded-lg bg-white shadow-sm"
          >
            <div>
              <div className="font-medium text-black">{student.name}</div>
              <div className="text-sm text-black">{student.email}</div>
              {(student.dietaryRequirements.length > 0 || student.allergies.length > 0) && (
                <div className="mt-1 text-xs text-black">
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
              onClick={() => onRemoveStudent(student.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
