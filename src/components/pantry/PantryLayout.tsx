
import React from 'react';
import PantryInventory from './inventory/PantryInventory';
import RecipeNeedsPanel from './recipe-needs/RecipeNeedsPanel';

const PantryLayout = () => {
  return (
    <div className="flex flex-grow overflow-hidden">
      {/* Left panel - Pantry inventory */}
      <div className="w-full md:w-1/3 bg-white shadow-md overflow-y-auto p-4">
        <PantryInventory />
      </div>
      
      {/* Right panel - Recipe needs and shopping list */}
      <div className="hidden md:block md:flex-grow p-4 overflow-y-auto">
        <RecipeNeedsPanel />
      </div>
    </div>
  );
};

export default PantryLayout;
