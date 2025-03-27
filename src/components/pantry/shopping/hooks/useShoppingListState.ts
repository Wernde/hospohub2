
import { useState, useMemo, useEffect } from 'react';
import { usePantry } from '../../PantryContext';
import { ViewMode, ShoppingItem } from './types';
import { getStores } from './utils/storeData';
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
  findBestValueStore
} from './utils/shoppingListCalcs';

export type { ViewMode, Store } from './types';

export const useShoppingListState = () => {
  const { shoppingList, setShoppingList } = usePantry();
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedStore, setSelectedStore] = useState<string>('local-market');
  
  // Get store data
  const stores = getStores();
  
  // Debug to check if we're getting the shopping list data
  useEffect(() => {
    console.log("Shopping list in useShoppingListState:", shoppingList);
  }, [shoppingList]);
  
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
  
  // Calculate cost per store for comparison
  const storeCosts = useMemo(() => 
    calculateStoreCosts(aggregatedList, stores),
    [aggregatedList, stores]
  );
  
  // Find best value store
  const bestValueStore = useMemo(() => 
    findBestValueStore(aggregatedList, stores, storeCosts),
    [storeCosts, stores, aggregatedList]
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
    stores
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
    
    // Computed values
    aggregatedList,
    itemsByRecipe,
    itemsByCategory,
    totalCost,
    recipeCosts,
    storeCosts,
    bestValueStore,
    
    // Methods
    setEditedQuantity,
    setViewMode,
    setSelectedStore,
    togglePurchased,
    startEditing,
    saveEditedQuantity,
    removeItem,
    exportList: () => exportList(totalCost),
    clearPurchasedItems,
    calculateItemCost
  };
};
