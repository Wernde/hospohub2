
import { useState } from 'react';

export const useItemPreferences = () => {
  const [itemPreferredStores, setItemPreferredStores] = useState<Record<string, string>>({});
  
  // Handle setting a preferred store for a specific item
  const setItemPreferredStore = (itemId: string, storeId: string) => {
    setItemPreferredStores(prev => ({
      ...prev,
      [itemId]: storeId
    }));
  };

  return {
    itemPreferredStores,
    setItemPreferredStore
  };
};
