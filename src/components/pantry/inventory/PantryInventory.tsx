
import React from 'react';
import { usePantry } from '../context/usePantry';
import PantrySearch from './PantrySearch';
import PantryFilters from './PantryFilters';
import AddItemButton from './AddItemButton';
import AddItemForm from './AddItemForm';
import PantryItemsList from './PantryItemsList';
import ReceiptScannerDialog from '../receipt-scanner/ReceiptScannerDialog';

const PantryInventory = () => {
  const { showAddItemForm } = usePantry();
  
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Pantry Inventory</h2>
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center mb-4">
          <PantrySearch />
          <ReceiptScannerDialog />
        </div>
        <PantryFilters />
      </div>
      
      <AddItemButton />
      {showAddItemForm && <AddItemForm />}
      
      <PantryItemsList />
    </div>
  );
};

export default PantryInventory;
