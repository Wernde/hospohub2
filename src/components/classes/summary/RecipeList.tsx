
import React from 'react';
import { RecipeListProps } from './types';

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  if (recipes.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Recipes ({recipes.length})</h3>
      <div className="space-y-2">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="p-3 border rounded-md bg-rgba(0, 0, 0, 0.12)-50">
            <div className="font-medium">{recipe.name}</div>
            <div className="text-sm text-gray-500">
              {recipe.difficulty} • {recipe.prepTime + recipe.cookTime} min • {recipe.servings} servings
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
