
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import PantryHeader from '@/components/pantry/PantryHeader';
import PantryLayout from '@/components/pantry/PantryLayout';
import { PantryProvider } from '@/components/pantry/PantryContext';
import Navbar from '@/components/Navbar';

const PantryPage = () => {
  return (
    <PantryProvider>
      <div className="flex flex-col w-full min-h-screen bg-background">
        <Navbar />
        <PantryLayout />
        <Toaster />
      </div>
    </PantryProvider>
  );
};

export default PantryPage;
