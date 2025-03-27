
import { PantryItem, RecipeNeed } from '../../types';
import { convertQuantity } from './conversionUtils';

// Update recipe needs with pantry availability status
export const updateRecipeNeedsWithPantryStatus = (
  recipeNeeds: RecipeNeed[], 
  pantryItems: PantryItem[]
): RecipeNeed[] => {
  return recipeNeeds.map(recipe => {
    const updatedIngredients = recipe.ingredients.map(ingredient => {
      // Find matching pantry item
      const pantryItem = pantryItems.find(item => 
        item.ingredientName.toLowerCase() === ingredient.name.toLowerCase());
      
      if (!pantryItem) {
        // Ingredient not in pantry
        return {
          ...ingredient,
          pantryStatus: 'order' as const,
          inPantry: 0
        };
      }
      
      // Convert quantities if units are different
      let availableInPantry = pantryItem.currentQuantity;
      if (pantryItem.unit !== ingredient.storeUnit) {
        availableInPantry = convertQuantity(
          pantryItem.currentQuantity,
          pantryItem.unit,
          ingredient.storeUnit
        );
      }
      
      // Determine if we have enough
      if (availableInPantry >= ingredient.storeQuantity) {
        return {
          ...ingredient,
          pantryStatus: 'in-pantry' as const,
          inPantry: availableInPantry
        };
      } else if (availableInPantry > 0) {
        return {
          ...ingredient,
          pantryStatus: 'partial' as const,
          inPantry: availableInPantry,
          needed: ingredient.storeQuantity - availableInPantry
        };
      } else {
        return {
          ...ingredient,
          pantryStatus: 'order' as const,
          inPantry: 0
        };
      }
    });
    
    return {
      ...recipe,
      ingredients: updatedIngredients
    };
  });
};
