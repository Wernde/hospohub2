
import { ShoppingItem, Store } from '../types';

// Calculate total cost for display
export const calculateTotalCost = (items: ShoppingItem[], selectedStore: string): string => {
  return items.reduce((total, item) => {
    return total + (item.prices?.[selectedStore] || 0) * item.quantity;
  }, 0).toFixed(2);
};

// Calculate cost per recipe
export const calculateRecipeCosts = (
  itemsByRecipe: Record<string, ShoppingItem[]>, 
  selectedStore: string
): Record<string, number> => {
  const costs: Record<string, number> = {};
  
  Object.entries(itemsByRecipe).forEach(([recipe, items]) => {
    costs[recipe] = +calculateTotalCost(items, selectedStore);
  });
  
  return costs;
};

// Calculate cost per store for comparison
export const calculateStoreCosts = (
  aggregatedList: ShoppingItem[],
  stores: Store[]
): Record<string, number> => {
  const costs: Record<string, number> = {};
  
  stores.forEach(store => {
    costs[store.id] = +calculateTotalCost(aggregatedList, store.id);
  });
  
  return costs;
};

// Find best value store
export const findBestValueStore = (
  aggregatedList: ShoppingItem[],
  stores: Store[],
  storeCosts: Record<string, number>
): string | null => {
  if (!aggregatedList.length) return null;
  
  const storeIds = stores.map(s => s.id);
  const sorted = storeIds.sort((a, b) => +storeCosts[a] - +storeCosts[b]);
  
  return sorted[0];
};

// Create a text representation of the shopping list for export
export const createExportText = (
  aggregatedList: ShoppingItem[], 
  purchasedItems: Record<string, boolean>, 
  selectedStore: string, 
  storeName: string,
  totalCost: string
): string => {
  // Group by category
  const categorized: Record<string, ShoppingItem[]> = {};
  
  aggregatedList.forEach(item => {
    const category = item.category || 'Uncategorized';
    if (!categorized[category]) {
      categorized[category] = [];
    }
    categorized[category].push(item);
  });
  
  let exportText = "SHOPPING LIST\n\n";
  
  // Build the text content
  exportText += `Store: ${storeName || 'Any'}\n`;
  exportText += `Total Cost: $${totalCost}\n\n`;
  
  Object.entries(categorized).forEach(([category, items]) => {
    exportText += `== ${category} ==\n`;
    items.forEach(item => {
      const isPurchased = purchasedItems[item.id] ? "[✓] " : "[ ] ";
      const price = item.prices?.[selectedStore] ? `$${item.prices[selectedStore].toFixed(2)}` : 'N/A';
      exportText += `${isPurchased}${item.quantity} ${item.unit} ${item.name} - ${price} (${item.recipes.join(', ')})\n`;
    });
    exportText += "\n";
  });
  
  return exportText;
};
