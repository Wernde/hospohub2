
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
    iconBg: 'bg-orange-500',
    href: '/recipes/new'
  },
  {
    id: 2,
    title: 'Schedule Class',
    description: 'Create a new class session and assign recipes to it.',
    icon: <Calendar className="h-6 w-6 text-white" />,
    iconBg: 'bg-green-500',
    href: '/classes/schedule'
  },
  {
    id: 3,
    title: 'Ingredient Calculator',
    description: 'Calculate ingredient quantities for different class sizes.',
    icon: <Calculator className="h-6 w-6 text-white" />,
    iconBg: 'bg-yellow-500',
    href: '/calculator'
  },
  {
    id: 4,
    title: 'Pantry Management',
    description: 'Manage your pantry inventory and create shopping lists.',
    icon: <ShoppingBasket className="h-6 w-6 text-white" />,
    iconBg: 'bg-purple-500',
    href: '/pantry'
  }
];

const QuickActions = () => {
  return (
    <Card className="shadow overflow-hidden mb-8">
      <CardHeader className="px-4 py-5 border-b bg-amber-100 border-gray-200 sm:px-6">
        <CardTitle className="text-lg text-black">Quick Actions</CardTitle>
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
