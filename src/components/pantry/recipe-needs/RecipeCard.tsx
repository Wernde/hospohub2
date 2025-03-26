
import React from 'react';
import { ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';
import { usePantry } from '../PantryContext';
import RecipeIngredientsList from './RecipeIngredientsList';
import { RecipeNeed } from '../types';

interface RecipeCardProps {
  recipe: RecipeNeed;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { expandedRecipes, toggleRecipe } = usePantry();
  
  const allIngredientsInPantry = recipe.ingredients.every(i => i.pantryStatus === 'in-pantry');
  
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => toggleRecipe(recipe.recipeId)}
      >
        <div className="flex items-center">
          {expandedRecipes[recipe.recipeId] ? 
            <ChevronDown className="h-5 w-5 text-gray-500 mr-2" /> : 
            <ChevronRight className="h-5 w-5 text-gray-500 mr-2" />
          }
          <div>
            <h3 className="font-semibold text-lg">{recipe.recipeTitle}</h3>
            <div className="text-sm text-gray-500">
              Class: {recipe.className} ({recipe.studentCount} students) • {recipe.date}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className={`px-2 py-1 text-xs rounded ${
            allIngredientsInPantry 
              ? 'bg-green-100 text-green-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {allIngredientsInPantry 
              ? 'All ingredients in pantry' 
              : 'Some items need ordering'}
          </span>
          <RefreshCw 
            className="ml-2 h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // Functionality to recheck pantry availability would go here
            }}
          />
        </div>
      </div>
      
      {expandedRecipes[recipe.recipeId] && (
        <RecipeIngredientsList recipe={recipe} />
      )}
    </div>
  );
};

export default RecipeCard;
