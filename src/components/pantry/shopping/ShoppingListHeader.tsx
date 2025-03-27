
import React from 'react';
import { ShoppingCart, CheckCircle2, FileText, List, Calendar, Tag, Store, BarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreSelector from './StoreSelector';
import { Store as StoreType, ViewMode } from './hooks/types';
import { Link } from 'react-router-dom';

interface ShoppingListHeaderProps {
  selectedStore: string;
  viewMode: ViewMode;
  totalCost: string;
  totalItems: number;
  onStoreChange: (storeId: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onClearPurchased: () => void;
  onExport: () => void;
}

const ShoppingListHeader = ({
  selectedStore,
  viewMode,
  totalCost,
  totalItems,
  onStoreChange,
  onViewModeChange,
  onClearPurchased,
  onExport
}: ShoppingListHeaderProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center">
          <ShoppingCart className="h-6 w-6 text-primary mr-2" />
          <CardTitle>Shopping List</CardTitle>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <StoreSelector 
            selectedStore={selectedStore} 
            onStoreChange={onStoreChange} 
          />
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={onClearPurchased}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span>Clear Purchased</span>
            </Button>
            <Button 
              className="flex items-center" 
              onClick={onExport}
            >
              <FileText className="h-4 w-4 mr-1" />
              <span>Export</span>
            </Button>
            <Link to="/pantry/settings">
              <Button variant="outline" className="flex items-center">
                <Settings className="h-4 w-4 mr-1" />
                <span>Store Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <Tabs 
          value={viewMode} 
          onValueChange={(value) => onViewModeChange(value as ViewMode)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="list" className="flex items-center gap-1">
              <List className="h-4 w-4" />
              <span>List View</span>
            </TabsTrigger>
            <TabsTrigger value="byRecipe" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>By Recipe</span>
            </TabsTrigger>
            <TabsTrigger value="byCategory" className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span>By Category</span>
            </TabsTrigger>
            <TabsTrigger value="byStore" className="flex items-center gap-1">
              <Store className="h-4 w-4" />
              <span>By Store</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center">
            <span className="text-sm font-medium">
              Total: <span className="text-primary font-bold">${totalCost}</span>
            </span>
          </div>
          
          <div className="flex items-center mt-2 sm:mt-0">
            <span className="text-sm text-muted-foreground">
              {totalItems} item{totalItems !== 1 ? 's' : ''} in list
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingListHeader;
