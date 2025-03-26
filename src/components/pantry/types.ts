
// Pantry Item Types
export interface PantryItem {
  id: string;
  ingredientName: string;
  category: string;
  currentQuantity: number;
  unit: string;
  location: string;
  expirationDate: string;
  lastUpdated: string;
  lowStockThreshold: number;
  isLowStock: boolean;
  recipeUnit: string;
  conversionFactor: number;
}

export interface NewPantryItem {
  ingredientName: string;
  category: string;
  currentQuantity: number;
  unit: string;
  location: string;
  lowStockThreshold: number;
}

// Recipe Need Types
export interface RecipeIngredient {
  id: string;
  name: string;
  recipeQuantity: number;
  recipeUnit: string;
  totalQuantity: number;
  storeQuantity: number;
  storeUnit: string;
  pantryStatus: 'check' | 'in-pantry' | 'partial' | 'order';
  inPantry?: number;
  needed?: number;
}

export interface RecipeNeed {
  recipeId: string;
  recipeTitle: string;
  classId: string;
  className: string;
  studentCount: number;
  date: string;
  ingredients: RecipeIngredient[];
}

// Shopping List Item
export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  recipes: string[];
  recipeId: string;
  className: string;
}
