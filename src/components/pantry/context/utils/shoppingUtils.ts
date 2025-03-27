
import { ShoppingListItem } from '../../types';

// Add an ingredient to the shopping list
export const addItemToShoppingList = (
  ingredient: any, 
  recipe: any, 
  currentShoppingList: ShoppingListItem[]
): ShoppingListItem[] => {
  // Check if already in shopping list with same name and unit
  const existingIndex = currentShoppingList.findIndex(item => 
    item.name.toLowerCase() === ingredient.name.toLowerCase() && 
    item.unit === ingredient.storeUnit &&
    item.recipeId === recipe.recipeId // Only combine if from the same recipe
  );
  
  if (existingIndex !== -1) {
    // Update existing item
    const updatedList = [...currentShoppingList];
    updatedList[existingIndex] = {
      ...updatedList[existingIndex],
      quantity: ingredient.storeQuantity, // Replace with new quantity
      recipes: [...new Set([...updatedList[existingIndex].recipes, recipe.recipeTitle])]
    };
    return updatedList;
  } else {
    // Add new item
    return [
      ...currentShoppingList,
      {
        id: `sl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: ingredient.name,
        quantity: ingredient.storeQuantity,
        unit: ingredient.storeUnit,
        recipes: [recipe.recipeTitle],
        recipeId: recipe.recipeId,
        className: recipe.className
      }
    ];
  }
};
