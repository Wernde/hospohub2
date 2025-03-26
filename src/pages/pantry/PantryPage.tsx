
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import PantryHeader from '@/components/pantry/PantryHeader';
import PantryLayout from '@/components/pantry/PantryLayout';
import { PantryProvider } from '@/components/pantry/PantryContext';

const PantryPage = () => {
  return (
    <PantryProvider>
      <div className="flex flex-col w-full min-h-screen bg-gray-50">
        <PantryHeader />
        <PantryLayout />
        <Toaster />
      </div>
    </PantryProvider>
  );
};

export default PantryPage;
