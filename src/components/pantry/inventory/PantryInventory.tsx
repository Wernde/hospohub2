
import React from 'react';
import { Link } from 'react-router-dom';
import { usePantry } from '../context/usePantry';
import PantrySearch from './PantrySearch';
import PantryFilters from './PantryFilters';
import AddItemButton from './AddItemButton';
import AddItemForm from './AddItemForm';
import PantryItemsList from './PantryItemsList';
import ReceiptScannerDialog from '../receipt-scanner/ReceiptScannerDialog';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

const PantryInventory = () => {
  const { showAddItemForm } = usePantry();
  
  return (
    <div className="text-black">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 text-black">Pantry Inventory</h2>
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center mb-4">
          <PantrySearch />
          <div className="flex gap-2">
            <ReceiptScannerDialog />
            <Link to="/orders">
              <Button variant="outline" size="sm" className="flex items-center gap-1 bg-stone-200 hover:bg-stone-300 border-stone-400 text-black">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Track Orders</span>
              </Button>
            </Link>
          </div>
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
