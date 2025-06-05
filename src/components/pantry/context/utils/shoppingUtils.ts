
import { ShoppingListItem } from '../../types';

export const addItemToShoppingList = (ingredient: any, recipe: any, currentList: ShoppingListItem[]): ShoppingListItem[] => {
  const existingItem = currentList.find(item => 
    item.ingredientName === ingredient.name && item.recipeId === recipe.recipeId
  );

  if (existingItem) {
    return currentList.map(item =>
      item.ingredientName === ingredient.name && item.recipeId === recipe.recipeId
        ? { ...item, quantity: item.quantity + ingredient.amount }
        : item
    );
  }

  const newItem: ShoppingListItem = {
    id: `shopping-${Date.now()}-${Math.random()}`,
    ingredientName: ingredient.name,
    quantity: ingredient.amount,
    unit: ingredient.unit,
    recipeId: recipe.recipeId,
    recipeName: recipe.recipeName,
    category: ingredient.category || 'Other',
    estimatedCost: 0,
    isChecked: false
  };

  return [...currentList, newItem];
};
