
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePantry } from '../../PantryContext';
import { 
  aggregateShoppingItems, 
  groupItemsByRecipe, 
  groupItemsByCategory, 
  calculateTotalCost, 
  createExportText 
} from '../utils/shoppingListUtils';

export type ViewMode = 'list' | 'byRecipe' | 'byCategory' | 'byStore';

export interface Store {
  id: string;
  name: string;
  color?: string;
}

export const useShoppingListState = () => {
  const { shoppingList, setShoppingList } = usePantry();
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedStore, setSelectedStore] = useState<string>('local-market');
  const { toast } = useToast();
  
  // Sample store data with colors for visual differentiation
  const stores: Store[] = [
    { id: 'local-market', name: 'Local Market', color: '#4CAF50' },
    { id: 'fresh-foods', name: 'Fresh Foods', color: '#2196F3' },
    { id: 'super-store', name: 'Super Store', color: '#FF9800' },
    { id: 'bulk-buy', name: 'Bulk Buy', color: '#9C27B0' }
  ];
  
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
  const recipeCosts = useMemo(() => {
    const costs: Record<string, number> = {};
    
    Object.entries(itemsByRecipe).forEach(([recipe, items]) => {
      costs[recipe] = +calculateTotalCost(items, selectedStore);
    });
    
    return costs;
  }, [itemsByRecipe, selectedStore]);
  
  // Calculate cost per store for comparison
  const storeCosts = useMemo(() => {
    const costs: Record<string, number> = {};
    
    stores.forEach(store => {
      costs[store.id] = +calculateTotalCost(aggregatedList, store.id);
    });
    
    return costs;
  }, [aggregatedList, stores]);
  
  // Find best value store
  const bestValueStore = useMemo(() => {
    if (!aggregatedList.length) return null;
    
    const storeIds = stores.map(s => s.id);
    const sorted = storeIds.sort((a, b) => +storeCosts[a] - +storeCosts[b]);
    
    return sorted[0];
  }, [storeCosts, stores, aggregatedList]);
  
  // Event handlers
  const togglePurchased = (itemId: string) => {
    setPurchasedItems({
      ...purchasedItems,
      [itemId]: !purchasedItems[itemId]
    });
    
    toast({
      title: purchasedItems[itemId] ? "Item unmarked" : "Item marked as purchased",
      description: purchasedItems[itemId] 
        ? "Item has been removed from purchased items" 
        : "Item has been added to your purchased items",
    });
  };
  
  const startEditing = (item: any) => {
    setEditingItem(item.id);
    setEditedQuantity(item.quantity);
  };
  
  const saveEditedQuantity = (item: any) => {
    // Find all items with the same name and unit
    const updatedShoppingList = shoppingList.map(listItem => {
      if (
        listItem.name.toLowerCase() === item.name.toLowerCase() && 
        listItem.unit === item.unit
      ) {
        // Calculate the ratio to distribute quantity changes proportionally
        const ratio = editedQuantity / item.quantity;
        return {
          ...listItem,
          quantity: listItem.quantity * ratio
        };
      }
      return listItem;
    });
    
    setShoppingList(updatedShoppingList);
    setEditingItem(null);
    
    toast({
      title: "Quantity updated",
      description: `Updated quantity for ${item.name} to ${editedQuantity} ${item.unit}`,
    });
  };
  
  const removeItem = (item: any) => {
    // Remove all items with the same name and unit
    const filteredList = shoppingList.filter(
      listItem => !(
        listItem.name.toLowerCase() === item.name.toLowerCase() && 
        listItem.unit === item.unit
      )
    );
    
    setShoppingList(filteredList);
    
    // Also remove from purchased items if it was there
    if (purchasedItems[item.id]) {
      const { [item.id]: _, ...remainingPurchased } = purchasedItems;
      setPurchasedItems(remainingPurchased);
    }
    
    toast({
      title: "Item removed",
      description: `${item.name} has been removed from your shopping list`,
      variant: "destructive"
    });
  };
  
  const exportList = () => {
    const exportText = createExportText(
      aggregatedList,
      purchasedItems,
      selectedStore,
      stores.find(s => s.id === selectedStore)?.name || 'Any',
      totalCost
    );
    
    // Create a downloadable file
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "List exported",
      description: "Shopping list has been exported as a text file",
    });
  };
  
  const clearPurchasedItems = () => {
    // Find IDs to remove
    const idsToRemove = Object.entries(purchasedItems)
      .filter(([_, isPurchased]) => isPurchased)
      .map(([id]) => id);
    
    if (idsToRemove.length === 0) {
      toast({
        title: "No purchased items",
        description: "There are no purchased items to clear",
      });
      return;
    }
    
    // Find names to remove (need to handle aggregated items)
    const namesToRemove: Record<string, string> = {};
    aggregatedList.forEach(item => {
      if (purchasedItems[item.id]) {
        const key = `${item.name.toLowerCase()}-${item.unit}`;
        namesToRemove[key] = item.name;
      }
    });
    
    // Filter out purchased items
    const filteredList = shoppingList.filter(item => {
      const key = `${item.name.toLowerCase()}-${item.unit}`;
      return !namesToRemove[key];
    });
    
    setShoppingList(filteredList);
    setPurchasedItems({});
    
    toast({
      title: "Purchased items cleared",
      description: `${idsToRemove.length} item(s) have been removed from your shopping list`,
    });
  };
  
  // Provide the calculator function to the components
  const calculateItemCost = (items: any[]) => calculateTotalCost(items, selectedStore);

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
    exportList,
    clearPurchasedItems,
    calculateItemCost
  };
};
