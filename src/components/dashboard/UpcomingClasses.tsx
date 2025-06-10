
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import UpcomingClassCard from './UpcomingClassCard';

// Upcoming classes data
const upcomingClasses = [
  {
    id: 1,
    title: 'Foundations of Pastry',
    time: '9:00 AM - 12:00 PM',
    location: 'Kitchen 3',
    status: 'Today'
  },
  {
    id: 2,
    title: 'Advanced Culinary Techniques',
    time: '1:00 PM - 4:00 PM',
    location: 'Kitchen 2',
    status: 'Tomorrow'
  },
  {
    id: 3,
    title: 'International Cuisine',
    time: '10:00 AM - 2:00 PM',
    location: 'Kitchen 1',
    status: 'Mar 24'
  }
];

const UpcomingClasses = () => {
  return (
    <Card className="shadow overflow-hidden">
      <CardHeader className="px-4 py-5 border-b border-green-100 sm:px-6">
        <CardTitle className="text-lg text-rgba(0, 0, 0, 0.12)-900">Upcoming Classes</CardTitle>
      </CardHeader>
      <ul className="divide-y divide-rgba(0, 0, 0, 0.12)-100">
        {upcomingClasses.map((cls) => (
          <UpcomingClassCard key={cls.id} cls={cls} />
        ))}
      </ul>
    </Card>
  );
};

export default UpcomingClasses;
