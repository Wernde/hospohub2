
import React, { useState } from 'react';
import { usePantry } from '../PantryContext';
import { RecipeNeed } from '../types';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface RecipeIngredientsListProps {
  recipe: RecipeNeed;
}

const RecipeIngredientsList: React.FC<RecipeIngredientsListProps> = ({ recipe }) => {
  const { updateIngredientStatus, addToShoppingList } = usePantry();
  const [orderQuantities, setOrderQuantities] = useState<Record<string, number>>({});
  const { toast } = useToast();
  
  const handleOrderClick = (ingredientId: string, ingredient: any) => {
    // Set default order quantity to the needed amount
    if (!orderQuantities[ingredientId]) {
      setOrderQuantities({
        ...orderQuantities,
        [ingredientId]: ingredient.storeQuantity
      });
    }
    
    // Update status to "order"
    updateIngredientStatus(recipe.recipeId, ingredientId, 'order');
  };
  
  const handleAddToShoppingList = (ingredient: any) => {
    // Get the quantity from the input
    const quantity = orderQuantities[ingredient.id] || ingredient.storeQuantity;
    
    // Create a modified ingredient with the custom quantity
    const ingredientWithQuantity = {
      ...ingredient,
      storeQuantity: quantity
    };
    
    // Add to shopping list with the custom quantity
    addToShoppingList(ingredientWithQuantity, recipe);
    
    toast({
      title: "Added to shopping list",
      description: `${quantity} ${ingredient.storeUnit} of ${ingredient.name} added for ${recipe.recipeTitle}`,
    });
  };
  
  const handleQuantityChange = (ingredientId: string, value: number) => {
    setOrderQuantities({
      ...orderQuantities,
      [ingredientId]: value
    });
  };
  
  return (
    <div className="border-t px-4 py-3">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="pb-2 font-medium">Ingredient</th>
            <th className="pb-2 font-medium">Recipe Qty</th>
            <th className="pb-2 font-medium">Store Qty</th>
            <th className="pb-2 font-medium">In Pantry</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {recipe.ingredients.map(ingredient => (
            <tr key={ingredient.id} className="border-t border-gray-100">
              <td className="py-2">{ingredient.name}</td>
              <td className="py-2">{ingredient.totalQuantity} {ingredient.recipeUnit}</td>
              <td className="py-2">{ingredient.storeQuantity} {ingredient.storeUnit}</td>
              <td className="py-2">
                {ingredient.inPantry !== undefined 
                  ? `${ingredient.inPantry} ${ingredient.storeUnit}`
                  : 'Checking...'}
              </td>
              <td className="py-2">
                {ingredient.pantryStatus === 'in-pantry' && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    In Pantry
                  </span>
                )}
                {ingredient.pantryStatus === 'partial' && (
                  <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                    Partial ({ingredient.needed} {ingredient.storeUnit} needed)
                  </span>
                )}
                {ingredient.pantryStatus === 'order' && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                    Need to Order
                  </span>
                )}
                {ingredient.pantryStatus === 'check' && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                    Checking...
                  </span>
                )}
              </td>
              <td className="py-2">
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1 text-xs rounded-full ${
                      ingredient.pantryStatus === 'in-pantry'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 hover:bg-green-500 hover:text-white'
                    }`}
                    onClick={() => updateIngredientStatus(recipe.recipeId, ingredient.id, 'in-pantry')}
                  >
                    In Pantry
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded-full ${
                      ingredient.pantryStatus === 'order'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 hover:bg-red-500 hover:text-white'
                    }`}
                    onClick={() => handleOrderClick(ingredient.id, ingredient)}
                  >
                    Order
                  </button>
                </div>
                
                {/* Show quantity input when order status is selected */}
                {ingredient.pantryStatus === 'order' && (
                  <div className="mt-2 flex space-x-2 items-center">
                    <Input
                      type="number"
                      min="0.1"
                      step="0.1"
                      className="w-20 h-8 text-xs"
                      value={orderQuantities[ingredient.id] || ingredient.storeQuantity}
                      onChange={(e) => handleQuantityChange(ingredient.id, parseFloat(e.target.value) || 0)}
                    />
                    <span className="text-xs">{ingredient.storeUnit}</span>
                    <button
                      className="px-3 py-1 text-xs bg-rgba(0, 0, 0, 0.12)-500 text-white rounded-full hover:bg-rgba(0, 0, 0, 0.12)-600"
                      onClick={() => handleAddToShoppingList(ingredient)}
                    >
                      Add to List
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeIngredientsList;
