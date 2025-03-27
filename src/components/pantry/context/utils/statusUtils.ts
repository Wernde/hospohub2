
import { PantryItem, RecipeNeed } from '../../types';
import { convertQuantity } from './conversionUtils';

// Update item status and handle pantry changes
export const updateItemStatusWithPantryChanges = (
  recipeId: string,
  ingredientId: string,
  newStatus: "check" | "in-pantry" | "partial" | "order",
  recipeNeeds: RecipeNeed[],
  pantryItems: PantryItem[],
  addToShoppingListCallback: (ingredient: any, recipe: any) => void
) => {
  let updatedPantryItems = null;
  
  const updatedRecipeNeeds = recipeNeeds.map(recipe => {
    if (recipe.recipeId === recipeId) {
      const updatedIngredients = recipe.ingredients.map(ingredient => {
        if (ingredient.id === ingredientId) {
          // If moving to "in-pantry", check if we need to update pantry quantities
          if (newStatus === 'in-pantry' && ingredient.pantryStatus !== 'in-pantry') {
            // Find the pantry item
            const pantryItemIndex = pantryItems.findIndex(item => 
              item.ingredientName.toLowerCase() === ingredient.name.toLowerCase());
            
            if (pantryItemIndex !== -1) {
              // Deep copy pantry items
              updatedPantryItems = [...pantryItems];
              const item = updatedPantryItems[pantryItemIndex];
              
              // Convert quantities if needed
              let quantityToDeduct = ingredient.storeQuantity;
              if (item.unit !== ingredient.storeUnit) {
                quantityToDeduct = convertQuantity(
                  ingredient.storeQuantity,
                  ingredient.storeUnit,
                  item.unit
                );
              }
              
              // Update pantry quantity
              const newQuantity = Math.max(0, item.currentQuantity - quantityToDeduct);
              updatedPantryItems[pantryItemIndex] = {
                ...item,
                currentQuantity: newQuantity,
                isLowStock: newQuantity <= item.lowStockThreshold,
                lastUpdated: new Date().toISOString().split('T')[0]
              };
            }
          }
          
          // If moving to "order", add to shopping list
          if (newStatus === 'order' && ingredient.pantryStatus !== 'order') {
            addToShoppingListCallback(ingredient, recipe);
          }
          
          return {
            ...ingredient,
            pantryStatus: newStatus
          };
        }
        return ingredient;
      });
      
      return {
        ...recipe,
        ingredients: updatedIngredients
      };
    }
    return recipe;
  });
  
  return {
    updatedRecipeNeeds,
    updatedPantryItems
  };
};
