
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { PantryProvider } from '@/components/pantry/PantryContext';
import Navbar from '@/components/Navbar';
import ShoppingListView from '@/components/pantry/shopping/ShoppingListView';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ShoppingPage = () => {
  return (
    <PantryProvider>
      <div className="flex flex-col w-full min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto flex flex-col gap-4 p-4 pt-24">
          <div className="flex justify-between items-center mb-4">
            <Link to="/pantry">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pantry
              </Button>
            </Link>
          </div>
          <ShoppingListView />
        </div>
        <Toaster />
      </div>
    </PantryProvider>
  );
};

export default ShoppingPage;
