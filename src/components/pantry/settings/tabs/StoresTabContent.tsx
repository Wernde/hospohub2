
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { StoreWithLocations } from '../../shopping/hooks/types/storeTypes';
import { useToast } from '@/hooks/use-toast';
import { StoreCard } from '../StoreCard';
import { EmptyStoreState } from '../EmptyStoreState';
import { AddStoreDialog } from '../AddStoreDialog';
import { AddLocationDialog } from '../AddLocationDialog';
import { useStoreDialog } from '../hooks/useStoreDialog';

interface StoresTabContentProps {
  stores: StoreWithLocations[];
  onUpdateStores: (stores: StoreWithLocations[]) => void;
  defaultStoreId: string;
  onSetDefaultStore: (storeId: string, locationId: string) => void;
}

const StoresTabContent = ({ 
  stores, 
  onUpdateStores, 
  defaultStoreId,
  onSetDefaultStore 
}: StoresTabContentProps) => {
  const { toast } = useToast();
  const { 
    showAddStore, 
    setShowAddStore,
    showAddLocation,
    setShowAddLocation
  } = useStoreDialog();
  
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreColor, setNewStoreColor] = useState('#4CAF50');
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationAddress, setNewLocationAddress] = useState('');

  const handleAddStore = () => {
    if (!newStoreName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a store name",
        variant: "destructive"
      });
      return;
    }

    const newStore: StoreWithLocations = {
      id: `store-${Date.now()}`,
      name: newStoreName,
      color: newStoreColor,
      locations: [],
      accountConnected: false
    };

    onUpdateStores([...stores, newStore]);
    setNewStoreName('');
    setNewStoreColor('#4CAF50');
    setShowAddStore(false);
    
    toast({
      title: "Store Added",
      description: `${newStoreName} has been added to your stores.`
    });
  };

  const handleAddLocation = () => {
    if (!newLocationName.trim() || !newLocationAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter both a location name and address",
        variant: "destructive"
      });
      return;
    }

    const storeId = showAddLocation;
    if (!storeId) return;

    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        return {
          ...store,
          locations: [
            ...store.locations,
            {
              id: `location-${Date.now()}`,
              name: newLocationName,
              address: newLocationAddress,
              isPreferred: store.locations.length === 0 // First location is preferred by default
            }
          ]
        };
      }
      return store;
    });

    onUpdateStores(updatedStores);
    setNewLocationName('');
    setNewLocationAddress('');
    setShowAddLocation(null);
    
    toast({
      title: "Location Added",
      description: `${newLocationName} has been added.`
    });
  };

  const handleRemoveStore = (storeId: string) => {
    const updatedStores = stores.filter(store => store.id !== storeId);
    onUpdateStores(updatedStores);
    
    // If we're removing the default store, set a new default
    if (storeId === defaultStoreId && updatedStores.length > 0) {
      const newDefault = updatedStores[0];
      const defaultLocation = newDefault.locations.length > 0 ? newDefault.locations[0].id : '';
      onSetDefaultStore(newDefault.id, defaultLocation);
    }
    
    toast({
      title: "Store Removed",
      description: "The store has been removed from your list."
    });
  };

  const handleRemoveLocation = (storeId: string, locationId: string) => {
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        const updatedLocations = store.locations.filter(loc => loc.id !== locationId);
        return {
          ...store,
          locations: updatedLocations
        };
      }
      return store;
    });

    onUpdateStores(updatedStores);
    
    toast({
      title: "Location Removed",
      description: "The location has been removed."
    });
  };

  const togglePreferredLocation = (storeId: string, locationId: string) => {
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        const updatedLocations = store.locations.map(loc => ({
          ...loc,
          isPreferred: loc.id === locationId ? !loc.isPreferred : loc.isPreferred
        }));
        return {
          ...store,
          locations: updatedLocations
        };
      }
      return store;
    });

    onUpdateStores(updatedStores);
  };

  const connectStoreAccount = (storeId: string) => {
    // This would connect to the store's API in a real implementation
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        return {
          ...store,
          accountConnected: true,
          loyaltyNumber: "1234567890" // Simulated loyalty number
        };
      }
      return store;
    });

    onUpdateStores(updatedStores);
    
    toast({
      title: "Account Connected",
      description: "Your store account has been connected successfully."
    });
  };

  return (
    <>
      <div className="mb-4">
        <Button onClick={() => setShowAddStore(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Store
        </Button>
      </div>

      {stores.length === 0 ? (
        <EmptyStoreState />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {stores.map(store => (
            <StoreCard
              key={store.id}
              store={store}
              isDefault={store.id === defaultStoreId}
              onRemoveStore={handleRemoveStore}
              onAddLocation={(storeId) => setShowAddLocation(storeId)}
              onRemoveLocation={handleRemoveLocation}
              onTogglePreferred={togglePreferredLocation}
              onSetDefault={onSetDefaultStore}
              onConnectAccount={connectStoreAccount}
            />
          ))}
        </div>
      )}

      {/* Add Store Dialog */}
      <Dialog open={showAddStore} onOpenChange={setShowAddStore}>
        <AddStoreDialog
          storeName={newStoreName}
          storeColor={newStoreColor}
          onStoreNameChange={setNewStoreName}
          onStoreColorChange={setNewStoreColor}
          onAddStore={handleAddStore}
          onCancel={() => setShowAddStore(false)}
        />
      </Dialog>

      {/* Add Location Dialog */}
      <Dialog open={!!showAddLocation} onOpenChange={() => setShowAddLocation(null)}>
        <AddLocationDialog
          locationName={newLocationName}
          locationAddress={newLocationAddress}
          onLocationNameChange={setNewLocationName}
          onLocationAddressChange={setNewLocationAddress}
          onAddLocation={handleAddLocation}
          onCancel={() => setShowAddLocation(null)}
        />
      </Dialog>
    </>
  );
};

export default StoresTabContent;
