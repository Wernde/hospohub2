
import { useMemo } from 'react';
import { ShoppingItem, Store } from './types';
import { 
  calculateTotalCost, 
  calculateRecipeCosts, 
  calculateStoreCosts,
  findBestValueStore,
  calculatePreferredStoresTotalCost
} from './utils/shoppingListCalcs';

export const useCostCalculations = (
  aggregatedList: ShoppingItem[],
  itemsByRecipe: Record<string, ShoppingItem[]>,
  stores: Store[],
  selectedStore: string,
  itemPreferredStores: Record<string, string>
) => {
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
  
  // Calculate total cost based on preferred stores
  const itemPreferredStoresTotalCost = useMemo(() => 
    calculatePreferredStoresTotalCost(aggregatedList, itemPreferredStores, selectedStore),
    [aggregatedList, itemPreferredStores, selectedStore]
  );

  // Provide the calculator function to the components
  const calculateItemCost = (items: ShoppingItem[]) => calculateTotalCost(items, selectedStore);
  
  return {
    totalCost,
    recipeCosts,
    storeCosts,
    bestValueStore,
    itemPreferredStoresTotalCost,
    calculateItemCost
  };
};
