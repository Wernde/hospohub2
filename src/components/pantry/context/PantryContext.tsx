
import { createContext } from 'react';
import { 
  PantryItem, 
  RecipeNeed, 
  ShoppingListItem, 
  NewPantryItem 
} from '../types';

export interface PantryContextType {
  // Pantry data
  pantryItems: PantryItem[];
  setPantryItems: React.Dispatch<React.SetStateAction<PantryItem[]>>;
  
  // Recipe needs
  recipeNeeds: RecipeNeed[];
  setRecipeNeeds: React.Dispatch<React.SetStateAction<RecipeNeed[]>>;
  
  // Expanded states
  expandedCategories: Record<string, boolean>;
  setExpandedCategories: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  expandedRecipes: Record<string, boolean>;
  setExpandedRecipes: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  
  // Filters and search
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filter: 'all' | 'low-stock' | 'expiring';
  setFilter: React.Dispatch<React.SetStateAction<'all' | 'low-stock' | 'expiring'>>;
  
  // Shopping list
  shoppingList: ShoppingListItem[];
  setShoppingList: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>;
  
  // Add item form
  showAddItemForm: boolean;
  setShowAddItemForm: React.Dispatch<React.SetStateAction<boolean>>;
  newItem: NewPantryItem;
  setNewItem: React.Dispatch<React.SetStateAction<NewPantryItem>>;
  
  // Actions
  toggleCategory: (category: string) => void;
  toggleRecipe: (recipeId: string) => void;
  updateIngredientStatus: (recipeId: string, ingredientId: string, newStatus: "check" | "in-pantry" | "partial" | "order") => void;
  updatePantryQuantity: (itemId: string, newQuantity: number) => void;
  removePantryItem: (itemId: string) => void;
  handleAddItem: () => void;
  addToShoppingList: (ingredient: any, recipe: any) => void;
}

export const PantryContext = createContext<PantryContextType | undefined>(undefined);
