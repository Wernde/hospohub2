
import { PantryItem, RecipeNeed, ShoppingListItem } from '../types';

// Toggle expanded state (for categories and recipes)
export const toggleExpandedState = (
  currentState: Record<string, boolean>, 
  key: string
): Record<string, boolean> => {
  return {
    ...currentState,
    [key]: !currentState[key]
  };
};

// Add an ingredient to the shopping list
export const addItemToShoppingList = (
  ingredient: any, 
  recipe: any, 
  currentShoppingList: ShoppingListItem[]
): ShoppingListItem[] => {
  // Check if already in shopping list
  const existingIndex = currentShoppingList.findIndex(item => 
    item.name.toLowerCase() === ingredient.name.toLowerCase() && 
    item.unit === ingredient.storeUnit);
  
  if (existingIndex !== -1) {
    // Update existing item
    const updatedList = [...currentShoppingList];
    updatedList[existingIndex] = {
      ...updatedList[existingIndex],
      quantity: updatedList[existingIndex].quantity + ingredient.storeQuantity,
      recipes: [...updatedList[existingIndex].recipes, recipe.recipeTitle]
    };
    return updatedList;
  } else {
    // Add new item
    return [
      ...currentShoppingList,
      {
        id: `sl-${Date.now()}`,
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

// Convert quantities between units
export const convertQuantity = (
  quantity: number, 
  fromUnit: string, 
  toUnit: string
): number => {
  if (fromUnit === toUnit) return quantity;
  
  // Handle common conversions
  if (fromUnit === 'g' && toUnit === 'kg') return quantity / 1000;
  if (fromUnit === 'kg' && toUnit === 'g') return quantity * 1000;
  if (fromUnit === 'ml' && toUnit === 'L') return quantity / 1000;
  if (fromUnit === 'L' && toUnit === 'ml') return quantity * 1000;
  
  // Default case - no conversion possible
  return quantity;
};

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
