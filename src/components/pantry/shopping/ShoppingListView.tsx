
import React, { useState, useMemo } from 'react';
import { DollarSign } from 'lucide-react';
import { usePantry } from '../PantryContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Import new components
import StandardTableView from './views/StandardTableView';
import RecipeView from './views/RecipeView';
import CategoryView from './views/CategoryView';
import EmptyShoppingList from './EmptyShoppingList';
import ShoppingListHeader from './ShoppingListHeader';

// Import utilities
import {
  aggregateShoppingItems,
  groupItemsByRecipe,
  groupItemsByCategory,
  calculateTotalCost,
  createExportText
} from './utils/shoppingListUtils';

const ShoppingListView = () => {
  const { shoppingList, setShoppingList } = usePantry();
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'list' | 'byRecipe' | 'byCategory'>('list');
  const [selectedStore, setSelectedStore] = useState<string>('local-market');
  const { toast } = useToast();
  
  // Sample store data
  const stores = [
    { id: 'local-market', name: 'Local Market' },
    { id: 'fresh-foods', name: 'Fresh Foods' },
    { id: 'super-store', name: 'Super Store' },
    { id: 'bulk-buy', name: 'Bulk Buy' }
  ];
  
  // Aggregate items
  const aggregatedItems = useMemo(() => 
    aggregateShoppingItems(shoppingList), [shoppingList]);
  
  const aggregatedList = Object.values(aggregatedItems);
  
  // Group items
  const itemsByRecipe = useMemo(() => 
    groupItemsByRecipe(aggregatedList), [aggregatedList]);
  
  const itemsByCategory = useMemo(() => 
    groupItemsByCategory(aggregatedList), [aggregatedList]);
  
  // Calculate total cost for display
  const totalCost = calculateTotalCost(aggregatedList, selectedStore);
  
  // Calculate cost per recipe
  const recipeCosts = useMemo(() => {
    const costs: Record<string, number> = {};
    
    Object.entries(itemsByRecipe).forEach(([recipe, items]) => {
      costs[recipe] = +calculateTotalCost(items, selectedStore);
    });
    
    return costs;
  }, [itemsByRecipe, selectedStore]);
  
  // Event handlers
  const togglePurchased = (itemId: string) => {
    setPurchasedItems({
      ...purchasedItems,
      [itemId]: !purchasedItems[itemId]
    });
    
    toast({
      title: purchasedItems[itemId] ? "Item unmarked" : "Item marked as purchased",
      description: purchasedItems[itemId] 
        ? "Item has been removed from purchased items" 
        : "Item has been added to your purchased items",
    });
  };
  
  const startEditing = (item: any) => {
    setEditingItem(item.id);
    setEditedQuantity(item.quantity);
  };
  
  const saveEditedQuantity = (item: any) => {
    // Find all items with the same name and unit
    const updatedShoppingList = shoppingList.map(listItem => {
      if (
        listItem.name.toLowerCase() === item.name.toLowerCase() && 
        listItem.unit === item.unit
      ) {
        // Calculate the ratio to distribute quantity changes proportionally
        const ratio = editedQuantity / item.quantity;
        return {
          ...listItem,
          quantity: listItem.quantity * ratio
        };
      }
      return listItem;
    });
    
    setShoppingList(updatedShoppingList);
    setEditingItem(null);
    
    toast({
      title: "Quantity updated",
      description: `Updated quantity for ${item.name} to ${editedQuantity} ${item.unit}`,
    });
  };
  
  const removeItem = (item: any) => {
    // Remove all items with the same name and unit
    const filteredList = shoppingList.filter(
      listItem => !(
        listItem.name.toLowerCase() === item.name.toLowerCase() && 
        listItem.unit === item.unit
      )
    );
    
    setShoppingList(filteredList);
    
    // Also remove from purchased items if it was there
    if (purchasedItems[item.id]) {
      const { [item.id]: _, ...remainingPurchased } = purchasedItems;
      setPurchasedItems(remainingPurchased);
    }
    
    toast({
      title: "Item removed",
      description: `${item.name} has been removed from your shopping list`,
      variant: "destructive"
    });
  };
  
  const exportList = () => {
    const exportText = createExportText(
      aggregatedList,
      purchasedItems,
      selectedStore,
      stores.find(s => s.id === selectedStore)?.name || 'Any',
      totalCost
    );
    
    // Create a downloadable file
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "List exported",
      description: "Shopping list has been exported as a text file",
    });
  };
  
  const clearPurchasedItems = () => {
    // Find IDs to remove
    const idsToRemove = Object.entries(purchasedItems)
      .filter(([_, isPurchased]) => isPurchased)
      .map(([id]) => id);
    
    if (idsToRemove.length === 0) {
      toast({
        title: "No purchased items",
        description: "There are no purchased items to clear",
      });
      return;
    }
    
    // Find names to remove (need to handle aggregated items)
    const namesToRemove: Record<string, string> = {};
    aggregatedList.forEach(item => {
      if (purchasedItems[item.id]) {
        const key = `${item.name.toLowerCase()}-${item.unit}`;
        namesToRemove[key] = item.name;
      }
    });
    
    // Filter out purchased items
    const filteredList = shoppingList.filter(item => {
      const key = `${item.name.toLowerCase()}-${item.unit}`;
      return !namesToRemove[key];
    });
    
    setShoppingList(filteredList);
    setPurchasedItems({});
    
    toast({
      title: "Purchased items cleared",
      description: `${idsToRemove.length} item(s) have been removed from your shopping list`,
    });
  };
  
  // Provide the calculator function to the components
  const calculateItemCost = (items: any[]) => calculateTotalCost(items, selectedStore);
  
  // Render based on the current view mode
  const renderContent = () => {
    if (aggregatedList.length === 0) {
      return <EmptyShoppingList />;
    }
    
    switch (viewMode) {
      case 'byRecipe':
        return (
          <RecipeView
            itemsByRecipe={itemsByRecipe}
            purchasedItems={purchasedItems}
            editingItem={editingItem}
            editedQuantity={editedQuantity}
            selectedStore={selectedStore}
            calculateTotalCost={calculateItemCost}
            togglePurchased={togglePurchased}
            startEditing={startEditing}
            setEditedQuantity={setEditedQuantity}
            saveEditedQuantity={saveEditedQuantity}
            removeItem={removeItem}
          />
        );
      case 'byCategory':
        return (
          <CategoryView
            itemsByCategory={itemsByCategory}
            purchasedItems={purchasedItems}
            editingItem={editingItem}
            editedQuantity={editedQuantity}
            selectedStore={selectedStore}
            togglePurchased={togglePurchased}
            startEditing={startEditing}
            setEditedQuantity={setEditedQuantity}
            saveEditedQuantity={saveEditedQuantity}
            removeItem={removeItem}
          />
        );
      default:
        return (
          <StandardTableView
            aggregatedList={aggregatedList}
            purchasedItems={purchasedItems}
            editingItem={editingItem}
            editedQuantity={editedQuantity}
            selectedStore={selectedStore}
            togglePurchased={togglePurchased}
            startEditing={startEditing}
            setEditedQuantity={setEditedQuantity}
            saveEditedQuantity={saveEditedQuantity}
            removeItem={removeItem}
          />
        );
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <ShoppingListHeader
          stores={stores}
          selectedStore={selectedStore}
          viewMode={viewMode}
          totalCost={totalCost}
          totalItems={aggregatedList.length}
          onStoreChange={setSelectedStore}
          onViewModeChange={setViewMode}
          onClearPurchased={clearPurchasedItems}
          onExport={exportList}
        />
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {renderContent()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShoppingListView;
