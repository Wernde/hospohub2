
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { PantryProvider } from '@/components/pantry/PantryContext';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import StoreSettings from '@/components/pantry/settings/StoreSettings';
import { useStoreSettings } from '@/components/pantry/shopping/hooks/useStoreSettings';

const PantrySettingsPage = () => {
  const { 
    stores, 
    updateStores, 
    defaultStoreId,
    defaultLocationId,
    setDefaultStore 
  } = useStoreSettings();

  return (
    <PantryProvider>
      <div className="flex flex-col w-full min-h-screen bg-gray-100 text-black">
        <Navbar />
        <div className="container mx-auto flex flex-col gap-4 p-4 pt-24 text-black page-transition">
          <div className="flex justify-between items-center mb-4">
            <Link to="/pantry">
              <Button variant="outline" className="flex items-center bg-stone-200 hover:bg-stone-300 border-stone-400 text-black">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pantry
              </Button>
            </Link>
          </div>
          
          <StoreSettings 
            stores={stores} 
            onUpdateStores={updateStores}
            defaultStoreId={defaultStoreId}
            onSetDefaultStore={setDefaultStore}
          />
        </div>
        <Toaster />
      </div>
    </PantryProvider>
  );
};

export default PantrySettingsPage;
