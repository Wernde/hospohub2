
import { useState, useEffect } from 'react';
import { usePantry } from '../../context/usePantry';
import { ViewMode, ShoppingItem } from './types';
import { useStoreSettings } from './useStoreSettings';
import { useShoppingListGroups } from './useShoppingListGroups';
import { useItemEditing } from './useItemEditing';
import { useItemPreferences } from './useItemPreferences';
import { useCostCalculations } from './useCostCalculations';
import { useShoppingListActions } from './utils/shoppingListActions';

export type { ViewMode } from './types';

export const useShoppingListState = () => {
  const { shoppingList, setShoppingList } = usePantry();
  const { stores, defaultStoreId } = useStoreSettings();
  
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedStore, setSelectedStore] = useState<string>(defaultStoreId || 'local-market');
  
  // Use focused hooks
  const { editingItem, editedQuantity, setEditingItem, setEditedQuantity } = useItemEditing();
  const { itemPreferredStores, setItemPreferredStore } = useItemPreferences();
  const { aggregatedList, itemsByRecipe, itemsByCategory } = useShoppingListGroups(shoppingList);
  
  // Update selected store when default changes
  useEffect(() => {
    if (defaultStoreId) {
      setSelectedStore(defaultStoreId);
    }
  }, [defaultStoreId]);
  
  // Debug to check if we're getting the shopping list data
  useEffect(() => {
    console.log("Shopping list in useShoppingListState:", shoppingList);
    console.log("Store settings:", { stores, defaultStoreId });
  }, [shoppingList, stores, defaultStoreId]);
  
  // Convert StoreWithLocations to the simple Store type for calculations
  const simpleStores = stores.map(store => ({
    id: store.id,
    name: store.name,
    color: store.color
  }));
  
  // Use cost calculations hook
  const {
    totalCost,
    recipeCosts,
    storeCosts,
    bestValueStore,
    itemPreferredStoresTotalCost,
    calculateItemCost
  } = useCostCalculations(
    aggregatedList,
    itemsByRecipe,
    simpleStores,
    selectedStore,
    itemPreferredStores
  );
  
  // Get action handlers
  const { 
    togglePurchased,
    startEditing,
    saveEditedQuantity,
    removeItem,
    exportList,
    clearPurchasedItems
  } = useShoppingListActions(
    shoppingList,
    setShoppingList,
    purchasedItems,
    setPurchasedItems,
    editingItem,
    setEditingItem,
    editedQuantity,
    setEditedQuantity,
    aggregatedList,
    selectedStore,
    simpleStores
  );

  return {
    // State
    purchasedItems,
    editingItem,
    editedQuantity,
    viewMode,
    selectedStore,
    stores,
    itemPreferredStores,
    
    // Computed values
    aggregatedList,
    itemsByRecipe,
    itemsByCategory,
    totalCost,
    recipeCosts,
    storeCosts,
    bestValueStore,
    itemPreferredStoresTotalCost,
    
    // Methods
    setEditedQuantity,
    setViewMode,
    setSelectedStore,
    setItemPreferredStore,
    togglePurchased,
    startEditing,
    saveEditedQuantity,
    removeItem,
    exportList: () => exportList(totalCost),
    clearPurchasedItems,
    calculateItemCost
  };
};
