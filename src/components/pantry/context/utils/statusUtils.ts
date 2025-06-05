
import { RecipeNeed, PantryItem, ShoppingListItem } from '../../types';
import { addItemToShoppingList } from './shoppingUtils';

export const updateItemStatusWithPantryChanges = (
  recipeId: string,
  ingredientId: string,
  newStatus: "check" | "in-pantry" | "partial" | "order",
  recipeNeeds: RecipeNeed[],
  pantryItems: PantryItem[],
  addToShoppingListFn: (ingredient: any, recipe: any) => void
): {
  updatedRecipeNeeds?: RecipeNeed[];
  updatedPantryItems?: PantryItem[];
} => {
  const updatedRecipeNeeds = recipeNeeds.map(recipe => {
    if (recipe.recipeId === recipeId) {
      return {
        ...recipe,
        ingredients: recipe.ingredients.map(ingredient => {
          if (ingredient.id === ingredientId) {
            // If setting to order, add to shopping list
            if (newStatus === 'order') {
              addToShoppingListFn(ingredient, recipe);
            }
            return { ...ingredient, status: newStatus };
          }
          return ingredient;
        })
      };
    }
    return recipe;
  });

  return { updatedRecipeNeeds };
};
