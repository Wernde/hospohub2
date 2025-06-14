
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import ActivityItem from './ActivityItem';
import { BookOpen, Calendar, Package } from 'lucide-react';

// Recent activity data
const recentActivities = [
  {
    id: 1,
    title: 'New recipe added: Chocolate Soufflé',
    time: 'Added by you - 2 hours ago',
    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
    iconBg: 'bg-blue-100'
  },
  {
    id: 2,
    title: 'New class scheduled: Bread Fundamentals',
    time: 'Scheduled by Admin - Yesterday',
    icon: <Calendar className="h-6 w-6 text-green-600" />,
    iconBg: 'bg-green-100'
  },
  {
    id: 3,
    title: 'Pantry inventory updated',
    time: 'Updated by Kitchen Staff - 2 days ago',
    icon: <Package className="h-6 w-6 text-red-600" />,
    iconBg: 'bg-red-100'
  }
];

const RecentActivity = () => {
  return (
    <Card className="shadow overflow-hidden">
      <CardHeader className="px-4 py-5 border-b bg-blue-50 border-gray-200 sm:px-6">
        <CardTitle className="text-lg text-gray-900">Recent Activity</CardTitle>
      </CardHeader>
      <ul className="divide-y divide-gray-200">
        {recentActivities.map((activity) => (
          <ActivityItem 
            key={activity.id}
            id={activity.id}
            title={activity.title}
            time={activity.time}
            icon={activity.icon}
            iconBg={activity.iconBg}
          />
        ))}
      </ul>
    </Card>
  );
};

export default RecentActivity;
