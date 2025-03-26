
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { ParticipantCardProps } from './types';

const ParticipantCard: React.FC<ParticipantCardProps> = ({ 
  studentCount, 
  dietaryRequirementsCount 
}) => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="font-semibold text-lg">Participant Information</div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-600" />
          <span className="text-sm">{studentCount} student{studentCount !== 1 ? 's' : ''} enrolled</span>
        </div>
        {studentCount > 0 && (
          <div className="text-sm text-muted-foreground">
            {dietaryRequirementsCount} student(s) with dietary requirements
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
