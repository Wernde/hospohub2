
import React from 'react';
import { StudentListProps } from './types';

const StudentList: React.FC<StudentListProps> = ({ students }) => {
  if (students.length === 0) return null;
  
  return (
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
  );
};

export default StudentList;
