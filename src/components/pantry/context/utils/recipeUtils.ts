
import { RecipeNeed, PantryItem } from '../../types';

export const updateRecipeNeedsWithPantryStatus = (
  recipeNeeds: RecipeNeed[], 
  pantryItems: PantryItem[]
): RecipeNeed[] => {
  return recipeNeeds.map(recipe => ({
    ...recipe,
    ingredients: recipe.ingredients.map(ingredient => {
      const pantryItem = pantryItems.find(item => 
        item.ingredientName.toLowerCase() === ingredient.name.toLowerCase()
      );

      if (!pantryItem) {
        return { ...ingredient, status: 'order' as const };
      }

      const availableAmount = pantryItem.currentQuantity * (pantryItem.conversionFactor || 1);
      const requiredAmount = ingredient.amount;

      if (availableAmount >= requiredAmount) {
        return { ...ingredient, status: 'in-pantry' as const };
      } else if (availableAmount > 0) {
        return { ...ingredient, status: 'partial' as const };
      } else {
        return { ...ingredient, status: 'order' as const };
      }
    })
  }));
};
