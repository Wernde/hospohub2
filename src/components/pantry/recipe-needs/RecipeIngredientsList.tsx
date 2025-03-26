
import React from 'react';
import { usePantry } from '../PantryContext';
import { RecipeNeed } from '../types';

interface RecipeIngredientsListProps {
  recipe: RecipeNeed;
}

const RecipeIngredientsList: React.FC<RecipeIngredientsListProps> = ({ recipe }) => {
  const { updateIngredientStatus } = usePantry();
  
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
                    onClick={() => updateIngredientStatus(recipe.recipeId, ingredient.id, 'order')}
                  >
                    Order
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeIngredientsList;
