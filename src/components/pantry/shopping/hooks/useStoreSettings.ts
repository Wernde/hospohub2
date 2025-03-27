
import { useState, useEffect } from 'react';
import { StoreWithLocations, StoreSettings } from './types/storeTypes';
import { getStores } from './utils/storeData';

// Create a key for localStorage
const STORE_SETTINGS_KEY = 'pantry-store-settings';

// Convert the basic stores to the enhanced type with locations
const convertToStoreWithLocations = (): StoreWithLocations[] => {
  const basicStores = getStores();
  return basicStores.map(store => ({
    ...store,
    locations: [],
    accountConnected: false
  }));
};

// Initialize with default settings
const getInitialSettings = (): StoreSettings => {
  const savedSettings = localStorage.getItem(STORE_SETTINGS_KEY);
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  
  const initialStores = convertToStoreWithLocations();
  return {
    preferredStores: initialStores,
    defaultStoreId: initialStores.length > 0 ? initialStores[0].id : '',
    defaultLocationId: '' // No locations by default
  };
};

export const useStoreSettings = () => {
  const [settings, setSettings] = useState<StoreSettings>(getInitialSettings);
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);
  
  // Update the stores list
  const updateStores = (newStores: StoreWithLocations[]) => {
    setSettings(prev => ({
      ...prev,
      preferredStores: newStores
    }));
  };
  
  // Set the default store and location
  const setDefaultStore = (storeId: string, locationId: string) => {
    setSettings(prev => ({
      ...prev,
      defaultStoreId: storeId,
      defaultLocationId: locationId
    }));
  };
  
  // Add a new store
  const addStore = (store: StoreWithLocations) => {
    setSettings(prev => ({
      ...prev,
      preferredStores: [...prev.preferredStores, store]
    }));
  };
  
  // Remove a store
  const removeStore = (storeId: string) => {
    setSettings(prev => {
      const updatedStores = prev.preferredStores.filter(s => s.id !== storeId);
      // If we're removing the default store, set a new default
      let newDefaultId = prev.defaultStoreId;
      let newLocationId = prev.defaultLocationId;
      
      if (storeId === prev.defaultStoreId && updatedStores.length > 0) {
        newDefaultId = updatedStores[0].id;
        const defaultStore = updatedStores[0];
        newLocationId = defaultStore.locations.length > 0 ? defaultStore.locations[0].id : '';
      }
      
      return {
        ...prev,
        preferredStores: updatedStores,
        defaultStoreId: newDefaultId,
        defaultLocationId: newLocationId
      };
    });
  };
  
  // Get a store by ID
  const getStore = (storeId: string) => {
    return settings.preferredStores.find(s => s.id === storeId);
  };
  
  // Get all stores
  const getAllStores = () => {
    return settings.preferredStores;
  };
  
  return {
    stores: settings.preferredStores,
    defaultStoreId: settings.defaultStoreId,
    defaultLocationId: settings.defaultLocationId,
    updateStores,
    setDefaultStore,
    addStore,
    removeStore,
    getStore,
    getAllStores
  };
};
