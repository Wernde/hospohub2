
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Import custom hook for state management
import { useShoppingListState } from './hooks/useShoppingListState';

// Import view components
import StandardTableView from './views/StandardTableView';
import RecipeView from './views/RecipeView';
import CategoryView from './views/CategoryView';
import EmptyShoppingList from './EmptyShoppingList';
import ShoppingListHeader from './ShoppingListHeader';

const ShoppingListView = () => {
  const {
    // State
    purchasedItems,
    editingItem,
    editedQuantity,
    viewMode,
    selectedStore,
    stores,
    
    // Computed values
    aggregatedList,
    itemsByRecipe,
    itemsByCategory,
    totalCost,
    
    // Methods
    setEditedQuantity,
    setViewMode,
    setSelectedStore,
    togglePurchased,
    startEditing,
    saveEditedQuantity,
    removeItem,
    exportList,
    clearPurchasedItems,
    calculateItemCost
  } = useShoppingListState();
  
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
