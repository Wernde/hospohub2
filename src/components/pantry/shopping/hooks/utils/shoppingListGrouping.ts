
import { ShoppingListItem } from '../../../types';
import { ShoppingItem } from '../types';

// Calculate total quantities for each ingredient by combining across recipes
export const aggregateShoppingItems = (shoppingList: ShoppingListItem[]): Record<string, ShoppingItem> => {
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
  }, {} as Record<string, ShoppingItem>);
};

// Group items by recipe
export const groupItemsByRecipe = (aggregatedList: ShoppingItem[]): Record<string, ShoppingItem[]> => {
  const groupedItems: Record<string, ShoppingItem[]> = {};
  
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
export const groupItemsByCategory = (aggregatedList: ShoppingItem[]): Record<string, ShoppingItem[]> => {
  const groupedItems: Record<string, ShoppingItem[]> = {};
  
  aggregatedList.forEach(item => {
    const category = item.category || 'Uncategorized';
    
    if (!groupedItems[category]) {
      groupedItems[category] = [];
    }
    groupedItems[category].push(item);
  });
  
  return groupedItems;
};
