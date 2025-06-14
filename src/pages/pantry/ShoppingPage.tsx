
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import PantryLayout from '@/components/pantry/PantryLayout';
import ShoppingListView from '@/components/pantry/shopping/ShoppingListView';
import { usePantry } from '@/components/pantry/context/usePantry';
import { exportShoppingList } from '@/utils/excelExport';
import ExportButton from '@/components/ui/export-button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { ConnectToSharePointDialog } from '@/components/pantry/settings/ConnectSharePointDialog';
import { PantryProvider } from '@/components/pantry/context/PantryProvider';
import Navbar from '@/components/Navbar';

const ShoppingPageContent = () => {
  const navigate = useNavigate();
  const { shoppingList } = usePantry();
  const { toast } = useToast();
  const [isSharePointDialogOpen, setIsSharePointDialogOpen] = useState(false);
  
  const handleExportToExcel = async () => {
    // Convert shopping list to format needed for export
    const itemsForExport = shoppingList.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit || '',
      // Add category and recipe info if available
      category: item.category || '',
      recipeName: item.recipes && item.recipes.length > 0 ? item.recipes[0] : ''
    }));
    
    // Convert all quantities to strings for Excel export
    const formattedItems = itemsForExport.map(item => ({
      ...item,
      quantity: item.quantity.toString()
    }));
    
    try {
      const result = await exportShoppingList(formattedItems, 'shopping-list');
      if (result?.success) {
        toast({
          title: "Export successful",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export failed",
        description: "Could not export shopping list",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="container mx-auto flex flex-col gap-4 p-4 pt-24">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Shopping List</h1>
          <p className="text-muted-foreground">Manage your grocery shopping list</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsSharePointDialogOpen(true)}
          >
            Connect to SharePoint
          </Button>
          <ExportButton 
            onExport={handleExportToExcel}
            label="Export Excel"
          />
        </div>
      </div>
      <ShoppingListView />
      <ConnectToSharePointDialog
        open={isSharePointDialogOpen}
        onOpenChange={setIsSharePointDialogOpen}
      />
      <Toaster />
    </div>
  );
};

// Wrapper component that provides the PantryProvider
const ShoppingPage = () => {
  return (
    <PantryProvider>
      <div className="flex flex-col w-full min-h-screen bg-gray-100">
        <Navbar />
        <ShoppingPageContent />
      </div>
    </PantryProvider>
  );
};

export default ShoppingPage;
