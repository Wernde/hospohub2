
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import QuickActionCard from './QuickActionCard';
import { Plus, Calendar, Calculator, ShoppingBasket } from 'lucide-react';

// Quick actions
const quickActions = [
  {
    id: 1,
    title: 'Add New Recipe',
    description: 'Upload a new recipe with AI-assisted ingredient extraction.',
    icon: <Plus className="h-6 w-6 text-white" />,
    iconBg: 'bg-rgba(243, 138, 39, 0.8)-500',
    href: '/recipes/new'
  },
  {
    id: 2,
    title: 'Schedule Class',
    description: 'Create a new class session and assign recipes to it.',
    icon: <Calendar className="h-6 w-6 text-white" />,
    iconBg: 'bg-rgba(39, 243, 46, 0.87)-500',
    href: '/classes/schedule'
  },
  {
    id: 3,
    title: 'Ingredient Calculator',
    description: 'Calculate ingredient quantities for different class sizes.',
    icon: <Calculator className="h-6 w-6 text-white" />,
    iconBg: 'bg-rgb(241, 233, 2)-500',
    href: '/calculator'
  },
  {
    id: 4,
    title: 'Pantry Management',
    description: 'Manage your pantry inventory and create shopping lists.',
    icon: <ShoppingBasket className="h-6 w-6 text-white" />,
    iconBg: 'bg-rgba(148, 39, 243, 0.68)-500',
    href: '/pantry'
  }
];

const QuickActions = () => {
  return (
    <Card className="shadow overflow-hidden mb-8">
      <CardHeader className="px-4 py-5 border-b border-rgba(0, 0, 0, 0.12)-100 sm:px-6">
        <CardTitle className="text-lg text-rgba(0, 0, 0, 0.12)-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <QuickActionCard 
              key={action.id}
              id={action.id}
              title={action.title}
              description={action.description}
              icon={action.icon}
              iconBg={action.iconBg}
              href={action.href}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
