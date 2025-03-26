
import React from 'react';
import { usePantry } from '../PantryContext';
import RecipeCard from './RecipeCard';

const RecipeNeedsList = () => {
  const { recipeNeeds } = usePantry();
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upcoming Recipe Needs</h2>
      
      {recipeNeeds.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No upcoming recipes scheduled
        </div>
      ) : (
        <div className="space-y-4">
          {recipeNeeds.map(recipe => (
            <RecipeCard key={recipe.recipeId} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeNeedsList;
