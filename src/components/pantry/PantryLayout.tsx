
import React from 'react';
import PantryInventory from './inventory/PantryInventory';
import RecipeNeedsPanel from './recipe-needs/RecipeNeedsPanel';

const PantryLayout = () => {
  return (
    <div className="flex flex-grow overflow-hidden">
      {/* Left panel - Pantry inventory */}
      <div className="w-full md:w-1/3 bg-card shadow-sm rounded-lg m-4 overflow-y-auto">
        <PantryInventory />
      </div>
      
      {/* Right panel - Recipe needs and shopping list */}
      <div className="hidden md:block md:flex-grow rounded-lg m-4 overflow-y-auto">
        <RecipeNeedsPanel />
      </div>
    </div>
  );
};

export default PantryLayout;
