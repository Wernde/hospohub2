
import React from 'react';
import RecipeNeedsList from './RecipeNeedsList';
import ShoppingList from './ShoppingList';

const RecipeNeedsPanel = () => {
  return (
    <div className="space-y-6">
      <RecipeNeedsList />
      <ShoppingList />
    </div>
  );
};

export default RecipeNeedsPanel;
