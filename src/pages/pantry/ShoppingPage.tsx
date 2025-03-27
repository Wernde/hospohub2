
import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { PantryProvider } from '@/components/pantry/PantryContext';
import Navbar from '@/components/Navbar';
import ShoppingListView from '@/components/pantry/shopping/ShoppingListView';

const ShoppingPage = () => {
  return (
    <PantryProvider>
      <div className="flex flex-col w-full min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto flex flex-col gap-4 p-4 pt-24">
          <ShoppingListView />
        </div>
        <Toaster />
      </div>
    </PantryProvider>
  );
};

export default ShoppingPage;
