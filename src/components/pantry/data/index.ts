
import { initialPantryData } from './pantryItems';
import { additionalPantryData } from './pantryItems2';
import { mockRecipeNeeds } from './recipeNeeds';
import { additionalRecipeNeeds } from './recipeNeeds2';
import { PantryItem, RecipeNeed } from '../types';

// Combine all pantry items
export const allPantryItems: PantryItem[] = [
  ...initialPantryData,
  ...additionalPantryData
];

// Combine all recipe needs
export const allRecipeNeeds: RecipeNeed[] = [
  ...mockRecipeNeeds,
  ...additionalRecipeNeeds
];

// Re-export for backward compatibility
export const initialPantryData: PantryItem[] = allPantryItems;
export const mockRecipeNeeds: RecipeNeed[] = allRecipeNeeds;
