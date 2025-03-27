
import { useMemo } from 'react';
import { ShoppingItem } from './types';
import { ShoppingListItem } from '../../types';
import { 
  aggregateShoppingItems, 
  groupItemsByRecipe, 
  groupItemsByCategory 
} from './utils/shoppingListGrouping';

export const useShoppingListGroups = (shoppingList: ShoppingListItem[]) => {
  // Aggregate items
  const aggregatedItems = useMemo(() => 
    aggregateShoppingItems(shoppingList), [shoppingList]);
  
  const aggregatedList = useMemo(() => 
    Object.values(aggregatedItems), [aggregatedItems]);
  
  // Group items
  const itemsByRecipe = useMemo(() => 
    groupItemsByRecipe(aggregatedList), [aggregatedList]);
  
  const itemsByCategory = useMemo(() => 
    groupItemsByCategory(aggregatedList), [aggregatedList]);

  return {
    aggregatedList,
    itemsByRecipe,
    itemsByCategory
  };
};
