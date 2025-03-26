
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, ChefHat } from 'lucide-react';
import { format } from 'date-fns';
import { ClassDetailCardProps } from './types';

const ClassDetailCard: React.FC<ClassDetailCardProps> = ({
  className,
  instructor,
  location,
  date,
  startTime,
  endTime
}) => {
  return (
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
  );
};

export default ClassDetailCard;
