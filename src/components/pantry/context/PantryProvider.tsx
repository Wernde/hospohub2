
import React, { useState, useEffect } from 'react';
import { 
  PantryItem, 
  RecipeNeed, 
  ShoppingListItem, 
  NewPantryItem 
} from '../types';
import { PantryContext } from './PantryContext';
import { initialPantryData, mockRecipeNeeds } from '../data';
import { 
  updateRecipeNeedsWithPantryStatus, 
  toggleExpandedState, 
  addItemToShoppingList,
  updateItemStatusWithPantryChanges
} from './pantryUtils';

// Create a key for localStorage
const SHOPPING_LIST_STORAGE_KEY = 'pantry-shopping-list';

export const PantryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // States
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(initialPantryData);
  const [recipeNeeds, setRecipeNeeds] = useState<RecipeNeed[]>(mockRecipeNeeds);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedRecipes, setExpandedRecipes] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'low-stock' | 'expiring'>('all');
  
  // Load shopping list from localStorage if available
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(() => {
    const savedList = localStorage.getItem(SHOPPING_LIST_STORAGE_KEY);
    return savedList ? JSON.parse(savedList) : [];
  });
  
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [newItem, setNewItem] = useState<NewPantryItem>({
    ingredientName: '',
    category: 'Dry Goods',
    currentQuantity: 1,
    unit: 'kg',
    location: '',
    lowStockThreshold: 0.5
  });

  // Save shopping list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Initialize expanded states
  useEffect(() => {
    // Group pantry items by category
    const categories: Record<string, boolean> = {};
    pantryItems.forEach(item => {
      categories[item.category] = true;
    });
    setExpandedCategories(categories);

    // Expand all recipes by default
    const recipes: Record<string, boolean> = {};
    recipeNeeds.forEach(recipe => {
      recipes[recipe.recipeId] = true;
    });
    setExpandedRecipes(recipes);
  }, []);

  // Check recipe needs against pantry
  useEffect(() => {
    const updatedRecipeNeeds = updateRecipeNeedsWithPantryStatus(recipeNeeds, pantryItems);
    setRecipeNeeds(updatedRecipeNeeds);
  }, [pantryItems]);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(toggleExpandedState(expandedCategories, category));
  };
  
  // Toggle recipe expansion
  const toggleRecipe = (recipeId: string) => {
    setExpandedRecipes(toggleExpandedState(expandedRecipes, recipeId));
  };
  
  // Add ingredient to shopping list
  const addToShoppingList = (ingredient: any, recipe: any) => {
    const updatedList = addItemToShoppingList(ingredient, recipe, shoppingList);
    setShoppingList(updatedList);
  };
  
  // Update pantry item quantity
  const updatePantryQuantity = (itemId: string, newQuantity: number) => {
    const updatedPantryItems = pantryItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          currentQuantity: newQuantity,
          isLowStock: newQuantity <= item.lowStockThreshold,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });
    
    setPantryItems(updatedPantryItems);
  };
  
  // Remove pantry item
  const removePantryItem = (itemId: string) => {
    setPantryItems(pantryItems.filter(item => item.id !== itemId));
  };
  
  // Update ingredient pantry status (swipe)
  const updateIngredientStatus = (recipeId: string, ingredientId: string, newStatus: "check" | "in-pantry" | "partial" | "order") => {
    const result = updateItemStatusWithPantryChanges(
      recipeId, 
      ingredientId, 
      newStatus, 
      recipeNeeds, 
      pantryItems,
      addToShoppingList
    );
    
    // Update states if changes were made
    if (result.updatedPantryItems) {
      setPantryItems(result.updatedPantryItems);
    }
    
    if (result.updatedRecipeNeeds) {
      setRecipeNeeds(result.updatedRecipeNeeds);
    }
  };
  
  // Handle adding new pantry item
  const handleAddItem = () => {
    if (newItem.ingredientName.trim() === '') {
      alert('Please enter an ingredient name');
      return;
    }
    
    // Create new item
    const newPantryItem = {
      id: `p${Date.now()}`,
      ...newItem,
      isLowStock: newItem.currentQuantity <= newItem.lowStockThreshold,
      lastUpdated: new Date().toISOString().split('T')[0],
      expirationDate: '', // Could add a date picker for this
      recipeUnit: newItem.unit === 'kg' ? 'g' : (newItem.unit === 'L' ? 'ml' : newItem.unit),
      conversionFactor: newItem.unit === 'kg' || newItem.unit === 'L' ? 1000 : 1
    };
    
    setPantryItems([...pantryItems, newPantryItem]);
    
    // Reset form
    setNewItem({
      ingredientName: '',
      category: 'Dry Goods',
      currentQuantity: 1,
      unit: 'kg',
      location: '',
      lowStockThreshold: 0.5
    });
    setShowAddItemForm(false);
  };

  return (
    <PantryContext.Provider value={{
      pantryItems,
      setPantryItems,
      recipeNeeds,
      setRecipeNeeds,
      expandedCategories,
      setExpandedCategories,
      expandedRecipes,
      setExpandedRecipes,
      searchTerm,
      setSearchTerm,
      filter,
      setFilter,
      shoppingList,
      setShoppingList,
      showAddItemForm,
      setShowAddItemForm,
      newItem,
      setNewItem,
      toggleCategory,
      toggleRecipe,
      updateIngredientStatus,
      updatePantryQuantity,
      removePantryItem,
      handleAddItem,
      addToShoppingList
    }}>
      {children}
    </PantryContext.Provider>
  );
};
