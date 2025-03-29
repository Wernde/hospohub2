
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
      recipeName: item.recipe?.name || ''
    }));
    
    exportShoppingList(itemsForExport, 'shopping-list');
  };
  
  return (
    <PantryLayout 
      title="Shopping List"
      description="Manage your grocery shopping list"
      actions={
        <ExportButton 
          onExport={handleExportToExcel}
          label="Export Excel"
        />
      }
    >
      <ShoppingListView />
    </PantryLayout>
  );
};

export default ShoppingPage;
