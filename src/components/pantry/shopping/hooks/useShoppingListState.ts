
import { useState, useMemo, useEffect } from 'react';
import { usePantry } from '../../context/usePantry';
import { ViewMode, ShoppingItem } from './types';
import { StoreWithLocations } from './types/storeTypes';
import { useShoppingListActions } from './utils/shoppingListActions';
import { 
  aggregateShoppingItems, 
  groupItemsByRecipe, 
  groupItemsByCategory 
} from './utils/shoppingListGrouping';
import { 
  calculateTotalCost, 
  calculateRecipeCosts, 
  calculateStoreCosts,
  findBestValueStore,
  calculatePreferredStoresTotalCost
} from './utils/shoppingListCalcs';
import { useStoreSettings } from './useStoreSettings';

export type { ViewMode } from './types';

export const useShoppingListState = () => {
  const { shoppingList, setShoppingList } = usePantry();
  const { stores, defaultStoreId, defaultLocationId } = useStoreSettings();
  
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedStore, setSelectedStore] = useState<string>(defaultStoreId || 'local-market');
  const [itemPreferredStores, setItemPreferredStores] = useState<Record<string, string>>({});
  
  // Update selected store when default changes
  useEffect(() => {
    if (defaultStoreId) {
      setSelectedStore(defaultStoreId);
    }
  }, [defaultStoreId]);
  
  // Debug to check if we're getting the shopping list data
  useEffect(() => {
    console.log("Shopping list in useShoppingListState:", shoppingList);
    console.log("Store settings:", { stores, defaultStoreId, defaultLocationId });
  }, [shoppingList, stores, defaultStoreId, defaultLocationId]);
  
  // Aggregate items
  const aggregatedItems = useMemo(() => 
    aggregateShoppingItems(shoppingList), [shoppingList]);
  
  const aggregatedList = Object.values(aggregatedItems);
  
  // Group items
  const itemsByRecipe = useMemo(() => 
    groupItemsByRecipe(aggregatedList), [aggregatedList]);
  
  const itemsByCategory = useMemo(() => 
    groupItemsByCategory(aggregatedList), [aggregatedList]);
  
  // Calculate total cost for display
  const totalCost = calculateTotalCost(aggregatedList, selectedStore);
  
  // Calculate cost per recipe
  const recipeCosts = useMemo(() => 
    calculateRecipeCosts(itemsByRecipe, selectedStore),
    [itemsByRecipe, selectedStore]
  );
  
  // Convert StoreWithLocations to the simple Store type for calculations
  const simpleStores = useMemo(() => 
    stores.map(store => ({
      id: store.id,
      name: store.name,
      color: store.color
    })),
    [stores]
  );
  
  // Calculate cost per store for comparison
  const storeCosts = useMemo(() => 
    calculateStoreCosts(aggregatedList, simpleStores),
    [aggregatedList, simpleStores]
  );
  
  // Find best value store
  const bestValueStore = useMemo(() => 
    findBestValueStore(aggregatedList, simpleStores, storeCosts),
    [storeCosts, simpleStores, aggregatedList]
  );
  
  // Calculate total cost based on preferred stores
  const itemPreferredStoresTotalCost = useMemo(() => 
    calculatePreferredStoresTotalCost(aggregatedList, itemPreferredStores, selectedStore),
    [aggregatedList, itemPreferredStores, selectedStore]
  );
  
  // Handle setting a preferred store for a specific item
  const setItemPreferredStore = (itemId: string, storeId: string) => {
    setItemPreferredStores(prev => ({
      ...prev,
      [itemId]: storeId
    }));
  };
  
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
  
  // Provide the calculator function to the components
  const calculateItemCost = (items: ShoppingItem[]) => calculateTotalCost(items, selectedStore);

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
