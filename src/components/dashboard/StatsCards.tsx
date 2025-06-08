
import React from 'react';
import { BookOpen, GraduationCap, Users, Package } from 'lucide-react';
import StatsCard from './StatsCard';

// Stats cards data
const statsCards = [
  {
    title: 'Total Recipes',
    value: '42',
    description: 'View all recipes',
    icon: <BookOpen className="h-6 w-6 text-white" />,
    iconBg: 'bg-rgba(0, 0, 0, 0.12)-500',
    href: '/recipes'
  },
  {
    title: 'Active Classes',
    value: '6',
    description: 'View all classes',
    icon: <GraduationCap className="h-6 w-6 text-white" />,
    iconBg: 'bg-green-500',
    href: '/classes'
  },
  {
    title: 'Total Students',
    value: '138',
    description: 'Manage students',
    icon: <Users className="h-6 w-6 text-white" />,
    iconBg: 'bg-yellow-500',
    href: '/students'
  },
  {
    title: 'Pantry Items',
    value: '204',
    description: 'View pantry',
    icon: <Package className="h-6 w-6 text-white" />,
    iconBg: 'bg-red-500',
    href: '/pantry'
  }
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          iconBg={stat.iconBg}
          href={stat.href}
        />
      ))}
    </div>
  );
};

export default StatsCards;
