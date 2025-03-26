
import React from 'react';
import PantryInventory from './inventory/PantryInventory';
import RecipeNeedsPanel from './recipe-needs/RecipeNeedsPanel';

const PantryLayout = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 p-4 pt-24">
      {/* Left panel - Pantry inventory */}
      <div className="w-full md:w-1/3 bg-card shadow-sm rounded-lg overflow-y-auto">
        <PantryInventory />
      </div>
      
      {/* Right panel - Recipe needs and shopping list */}
      <div className="w-full md:w-2/3 overflow-y-auto">
        <RecipeNeedsPanel />
      </div>
    </div>
  );
};

export default PantryLayout;
