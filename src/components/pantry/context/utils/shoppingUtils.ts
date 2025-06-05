
import { ShoppingListItem } from '../../types';

export const addItemToShoppingList = (ingredient: any, recipe: any, currentList: ShoppingListItem[]): ShoppingListItem[] => {
  const existingItem = currentList.find(item => 
    item.name === ingredient.name && item.recipeId === recipe.recipeId
  );

  if (existingItem) {
    return currentList.map(item =>
      item.name === ingredient.name && item.recipeId === recipe.recipeId
        ? { ...item, quantity: item.quantity + (ingredient.storeQuantity || ingredient.amount || 1) }
        : item
    );
  }

  const newItem: ShoppingListItem = {
    id: `shopping-${Date.now()}-${Math.random()}`,
    name: ingredient.name,
    quantity: ingredient.storeQuantity || ingredient.amount || 1,
    unit: ingredient.storeUnit || ingredient.unit || '',
    recipes: [recipe.recipeTitle || recipe.recipeName || ''],
    recipeId: recipe.recipeId,
    className: recipe.className || '',
    category: ingredient.category || 'Other'
  };

  return [...currentList, newItem];
};
