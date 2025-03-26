import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PantryItem, 
  RecipeNeed, 
  ShoppingListItem, 
  NewPantryItem 
} from '@/components/pantry/types';
import { initialPantryData, mockRecipeNeeds } from '@/components/pantry/data';

interface PantryContextType {
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
  updateIngredientStatus: (recipeId: string, ingredientId: string, newStatus: string) => void;
  updatePantryQuantity: (itemId: string, newQuantity: number) => void;
  removePantryItem: (itemId: string) => void;
  handleAddItem: () => void;
  addToShoppingList: (ingredient: any, recipe: any) => void;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export const PantryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // States
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(initialPantryData);
  const [recipeNeeds, setRecipeNeeds] = useState<RecipeNeed[]>(mockRecipeNeeds);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedRecipes, setExpandedRecipes] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'low-stock' | 'expiring'>('all');
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [newItem, setNewItem] = useState<NewPantryItem>({
    ingredientName: '',
    category: 'Dry Goods',
    currentQuantity: 1,
    unit: 'kg',
    location: '',
    lowStockThreshold: 0.5
  });

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
    const updatedRecipeNeeds = recipeNeeds.map(recipe => {
      const updatedIngredients = recipe.ingredients.map(ingredient => {
        // Find matching pantry item
        const pantryItem = pantryItems.find(item => 
          item.ingredientName.toLowerCase() === ingredient.name.toLowerCase());
        
        if (!pantryItem) {
          // Ingredient not in pantry
          return {
            ...ingredient,
            pantryStatus: 'order',
            inPantry: 0
          };
        }
        
        // Convert quantities if units are different
        let availableInPantry = pantryItem.currentQuantity;
        if (pantryItem.unit !== ingredient.storeUnit) {
          // For example, if recipe needs kg but pantry has g
          if (pantryItem.unit === 'g' && ingredient.storeUnit === 'kg') {
            availableInPantry = pantryItem.currentQuantity / 1000;
          } else if (pantryItem.unit === 'kg' && ingredient.storeUnit === 'g') {
            availableInPantry = pantryItem.currentQuantity * 1000;
          } else if (pantryItem.unit === 'ml' && ingredient.storeUnit === 'L') {
            availableInPantry = pantryItem.currentQuantity / 1000;
          } else if (pantryItem.unit === 'L' && ingredient.storeUnit === 'ml') {
            availableInPantry = pantryItem.currentQuantity * 1000;
          }
          // Other conversions would be handled similarly
        }
        
        // Determine if we have enough
        if (availableInPantry >= ingredient.storeQuantity) {
          return {
            ...ingredient,
            pantryStatus: 'in-pantry',
            inPantry: availableInPantry
          };
        } else if (availableInPantry > 0) {
          return {
            ...ingredient,
            pantryStatus: 'partial',
            inPantry: availableInPantry,
            needed: ingredient.storeQuantity - availableInPantry
          };
        } else {
          return {
            ...ingredient,
            pantryStatus: 'order',
            inPantry: 0
          };
        }
      });
      
      return {
        ...recipe,
        ingredients: updatedIngredients
      };
    });
    
    setRecipeNeeds(updatedRecipeNeeds);
  }, [pantryItems]);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
  };
  
  // Toggle recipe expansion
  const toggleRecipe = (recipeId: string) => {
    setExpandedRecipes({
      ...expandedRecipes,
      [recipeId]: !expandedRecipes[recipeId]
    });
  };
  
  // Add ingredient to shopping list
  const addToShoppingList = (ingredient: any, recipe: any) => {
    // Check if already in shopping list
    const existingIndex = shoppingList.findIndex(item => 
      item.name.toLowerCase() === ingredient.name.toLowerCase() && 
      item.unit === ingredient.storeUnit);
    
    if (existingIndex !== -1) {
      // Update existing item
      const updatedList = [...shoppingList];
      updatedList[existingIndex] = {
        ...updatedList[existingIndex],
        quantity: updatedList[existingIndex].quantity + ingredient.storeQuantity,
        recipes: [...updatedList[existingIndex].recipes, recipe.recipeTitle]
      };
      setShoppingList(updatedList);
    } else {
      // Add new item
      setShoppingList([
        ...shoppingList,
        {
          id: `sl-${Date.now()}`,
          name: ingredient.name,
          quantity: ingredient.storeQuantity,
          unit: ingredient.storeUnit,
          recipes: [recipe.recipeTitle],
          recipeId: recipe.recipeId,
          className: recipe.className
        }
      ]);
    }
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
  const updateIngredientStatus = (recipeId: string, ingredientId: string, newStatus: string) => {
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
                const updatedPantryItems = [...pantryItems];
                const item = updatedPantryItems[pantryItemIndex];
                
                // Convert quantities if needed
                let quantityToDeduct = ingredient.storeQuantity;
                if (item.unit !== ingredient.storeUnit) {
                  if (ingredient.storeUnit === 'kg' && item.unit === 'g') {
                    quantityToDeduct *= 1000;
                  } else if (ingredient.storeUnit === 'g' && item.unit === 'kg') {
                    quantityToDeduct /= 1000;
                  } else if (ingredient.storeUnit === 'L' && item.unit === 'ml') {
                    quantityToDeduct *= 1000;
                  } else if (ingredient.storeUnit === 'ml' && item.unit === 'L') {
                    quantityToDeduct /= 1000;
                  }
                }
                
                // Update pantry quantity
                const newQuantity = Math.max(0, item.currentQuantity - quantityToDeduct);
                updatedPantryItems[pantryItemIndex] = {
                  ...item,
                  currentQuantity: newQuantity,
                  isLowStock: newQuantity <= item.lowStockThreshold,
                  lastUpdated: new Date().toISOString().split('T')[0]
                };
                
                setPantryItems(updatedPantryItems);
              }
            }
            
            // If moving to "order", add to shopping list
            if (newStatus === 'order' && ingredient.pantryStatus !== 'order') {
              addToShoppingList(ingredient, recipe);
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
    
    setRecipeNeeds(updatedRecipeNeeds);
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

export const usePantry = () => {
  const context = useContext(PantryContext);
  if (context === undefined) {
    throw new Error('usePantry must be used within a PantryProvider');
  }
  return context;
};
