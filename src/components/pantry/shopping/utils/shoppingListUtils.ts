
import { ShoppingListItem } from '../../types';

// Calculate total quantities for each ingredient by combining across recipes
export const aggregateShoppingItems = (shoppingList: ShoppingListItem[]) => {
  return shoppingList.reduce((acc, item) => {
    const key = `${item.name.toLowerCase()}-${item.unit}`;
    if (!acc[key]) {
      acc[key] = {
        ...item,
        recipes: [...new Set(item.recipes)],
        classNames: [item.className],
        // Simulate random prices for each store
        prices: {
          'local-market': +(Math.random() * 5 + 1).toFixed(2),
          'fresh-foods': +(Math.random() * 5 + 1).toFixed(2), 
          'super-store': +(Math.random() * 5 + 1).toFixed(2),
          'bulk-buy': +(Math.random() * 5 + 0.5).toFixed(2)
        },
        // Simulate a random category
        category: ['Produce', 'Dairy', 'Meat', 'Bakery', 'Dry Goods', 'Frozen', 'Beverages'][
          Math.floor(Math.random() * 7)
        ]
      };
    } else {
      acc[key].quantity += item.quantity;
      acc[key].recipes = [...new Set([...acc[key].recipes, ...item.recipes])];
      if (!acc[key].classNames.includes(item.className)) {
        acc[key].classNames.push(item.className);
      }
    }
    return acc;
  }, {} as Record<string, any>);
};

// Group items by recipe
export const groupItemsByRecipe = (aggregatedList: any[]) => {
  const groupedItems: Record<string, any[]> = {};
  
  aggregatedList.forEach(item => {
    item.recipes.forEach((recipe: string) => {
      if (!groupedItems[recipe]) {
        groupedItems[recipe] = [];
      }
      groupedItems[recipe].push(item);
    });
  });
  
  return groupedItems;
};

// Group items by category
export const groupItemsByCategory = (aggregatedList: any[]) => {
  const groupedItems: Record<string, any[]> = {};
  
  aggregatedList.forEach(item => {
    const category = item.category || 'Uncategorized';
    
    if (!groupedItems[category]) {
      groupedItems[category] = [];
    }
    groupedItems[category].push(item);
  });
  
  return groupedItems;
};

// Calculate total cost
export const calculateTotalCost = (items: any[], selectedStore: string) => {
  return items.reduce((total, item) => {
    return total + (item.prices?.[selectedStore] || 0) * item.quantity;
  }, 0).toFixed(2);
};

// Create a text representation of the shopping list for export
export const createExportText = (
  aggregatedList: any[], 
  purchasedItems: Record<string, boolean>, 
  selectedStore: string, 
  storeName: string,
  totalCost: string
) => {
  // Group by category
  const categorized: Record<string, any[]> = {};
  
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
