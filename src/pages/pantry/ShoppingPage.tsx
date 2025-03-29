
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import PantryLayout from '@/components/pantry/PantryLayout';
import ShoppingListView from '@/components/pantry/shopping/ShoppingListView';
import { usePantry } from '@/components/pantry/context/usePantry';
import { exportShoppingList } from '@/utils/excelExport';
import ExportButton from '@/components/ui/export-button';

const ShoppingPage = () => {
  const navigate = useNavigate();
  const { shoppingList } = usePantry();
  
  const handleExportToExcel = () => {
    // Convert shopping list to format needed for export
    const itemsForExport = shoppingList.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit || '',
      // Use optional chaining for properties that might not exist
      category: item.category || '',
      recipeName: item.recipes && item.recipes.length > 0 ? item.recipes[0] : ''
    }));
    
    // Convert all quantities to strings for Excel export
    const formattedItems = itemsForExport.map(item => ({
      ...item,
      quantity: item.quantity.toString()
    }));
    
    exportShoppingList(formattedItems, 'shopping-list');
  };
  
  return (
    <div className="container mx-auto flex flex-col gap-4 p-4 pt-24">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Shopping List</h1>
          <p className="text-muted-foreground">Manage your grocery shopping list</p>
        </div>
        <ExportButton 
          onExport={handleExportToExcel}
          label="Export Excel"
        />
      </div>
      <ShoppingListView />
    </div>
  );
};

export default ShoppingPage;
