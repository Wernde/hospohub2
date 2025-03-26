
import { initialPantryData as originalPantryData } from './pantryItems';
import { additionalPantryData } from './pantryItems2';
import { mockRecipeNeeds as originalRecipeNeeds } from './recipeNeeds';
import { additionalRecipeNeeds } from './recipeNeeds2';
import { PantryItem, RecipeNeed } from '../types';

// Combine all pantry items
export const allPantryItems: PantryItem[] = [
  ...originalPantryData,
  ...additionalPantryData
];

// Combine all recipe needs
export const allRecipeNeeds: RecipeNeed[] = [
  ...originalRecipeNeeds,
  ...additionalRecipeNeeds
];

// Re-export for backward compatibility
export const initialPantryData = allPantryItems;
export const mockRecipeNeeds = allRecipeNeeds;
