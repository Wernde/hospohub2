
import React from 'react';
import { usePantry } from '../PantryContext';
import PantrySearch from './PantrySearch';
import PantryFilters from './PantryFilters';
import AddItemButton from './AddItemButton';
import AddItemForm from './AddItemForm';
import PantryItemsList from './PantryItemsList';

const PantryInventory = () => {
  const { showAddItemForm } = usePantry();
  
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Pantry Inventory</h2>
        <PantrySearch />
        <PantryFilters />
      </div>
      
      <AddItemButton />
      {showAddItemForm && <AddItemForm />}
      
      <PantryItemsList />
    </div>
  );
};

export default PantryInventory;
