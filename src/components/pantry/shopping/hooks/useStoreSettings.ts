
import { useState, useEffect } from 'react';
import { StoreWithLocations } from './types/storeTypes';
import { getStoresWithLocations } from './utils/storeData';

export const useStoreSettings = () => {
  const [stores, setStores] = useState<StoreWithLocations[]>([]);
  const [defaultStoreId, setDefaultStoreId] = useState<string>('aldi');
  const [defaultLocationId, setDefaultLocationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load stores on component mount
  useEffect(() => {
    const loadStores = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call to your backend
        const storeData = getStoresWithLocations();
        setStores(storeData);
        
        // Set default location if not already set
        if (!defaultLocationId && storeData.length > 0) {
          const defaultStore = storeData.find(store => store.id === defaultStoreId) || storeData[0];
          const preferredLocation = defaultStore.locations.find(loc => loc.isPreferred);
          
          if (preferredLocation) {
            setDefaultLocationId(preferredLocation.id);
          } else if (defaultStore.locations.length > 0) {
            setDefaultLocationId(defaultStore.locations[0].id);
          }
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load store settings:', err);
        setError('Failed to load store settings');
        setIsLoading(false);
      }
    };

    loadStores();
  }, [defaultStoreId, defaultLocationId]);

  // Update store settings
  const updateStores = async (updatedStores: StoreWithLocations[]) => {
    try {
      // In a real app, this would save to a database
      console.log('Saving store settings:', updatedStores);
      setStores(updatedStores);
      return true;
    } catch (err) {
      console.error('Failed to update store settings:', err);
      setError('Failed to save store settings');
      return false;
    }
  };

  // Set default store
  const setDefaultStore = (storeId: string, locationId?: string) => {
    setDefaultStoreId(storeId);
    if (locationId) {
      setDefaultLocationId(locationId);
    } else {
      // Find first location for this store
      const store = stores.find(s => s.id === storeId);
      if (store && store.locations.length > 0) {
        const preferredLocation = store.locations.find(loc => loc.isPreferred);
        setDefaultLocationId(preferredLocation?.id || store.locations[0].id);
      }
    }
  };

  return {
    stores,
    defaultStoreId,
    defaultLocationId,
    updateStores,
    setDefaultStore,
    isLoading,
    error
  };
};
