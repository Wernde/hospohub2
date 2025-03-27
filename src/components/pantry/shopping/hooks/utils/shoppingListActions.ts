
import { useToast } from '@/hooks/use-toast';
import { ShoppingListItem } from '../../../types';
import { ShoppingItem } from '../types';
import { createExportText } from './shoppingListCalcs';

export const useShoppingListActions = (
  shoppingList: ShoppingListItem[],
  setShoppingList: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>,
  purchasedItems: Record<string, boolean>,
  setPurchasedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  editingItem: string | null,
  setEditingItem: React.Dispatch<React.SetStateAction<string | null>>,
  editedQuantity: number,
  setEditedQuantity: React.Dispatch<React.SetStateAction<number>>,
  aggregatedList: ShoppingItem[],
  selectedStore: string,
  stores: { id: string, name: string }[]
) => {
  const { toast } = useToast();

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
  
  const startEditing = (item: ShoppingItem) => {
    setEditingItem(item.id);
    setEditedQuantity(item.quantity);
  };
  
  const saveEditedQuantity = (item: ShoppingItem) => {
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
  
  const removeItem = (item: ShoppingItem) => {
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
  
  const exportList = (totalCost: string) => {
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

  return {
    togglePurchased,
    startEditing,
    saveEditedQuantity,
    removeItem,
    exportList,
    clearPurchasedItems
  };
};
