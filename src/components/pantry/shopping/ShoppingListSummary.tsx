
import React from 'react';
import { DollarSign, ShoppingCart, Tag, Calendar, Store } from 'lucide-react';

interface ShoppingListSummaryProps {
  totalCost: string;
  totalItems: number;
  itemsByCategory: Record<string, any[]>;
  itemsByRecipe: Record<string, any[]>;
  storeCosts?: Record<string, number>;
  stores?: any[];
  selectedStoreTotal?: string;
  itemPreferredStoresTotalCost?: string;
}

const ShoppingListSummary = ({
  totalCost,
  totalItems,
  itemsByCategory,
  itemsByRecipe,
  storeCosts = {},
  stores = [],
  selectedStoreTotal,
  itemPreferredStoresTotalCost
}: ShoppingListSummaryProps) => {
  // Count number of categories and recipes
  const categoryCount = Object.keys(itemsByCategory).length;
  const recipeCount = Object.keys(itemsByRecipe).length;

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-semibold mb-3 text-black">Shopping Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center p-3 bg-blue-50 rounded-lg">
          <DollarSign className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-black">Total Cost</p>
            <p className="text-xl font-bold text-black">${totalCost}</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-green-50 rounded-lg">
          <ShoppingCart className="h-8 w-8 text-green-500 mr-3" />
          <div>
            <p className="text-sm text-black">Total Items</p>
            <p className="text-xl font-bold text-black">{totalItems}</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-purple-50 rounded-lg">
          <Tag className="h-8 w-8 text-purple-500 mr-3" />
          <div>
            <p className="text-sm text-black">Categories</p>
            <p className="text-xl font-bold text-black">{categoryCount}</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-orange-50 rounded-lg">
          <Calendar className="h-8 w-8 text-orange-500 mr-3" />
          <div>
            <p className="text-sm text-black">Recipes</p>
            <p className="text-xl font-bold text-black">{recipeCount}</p>
          </div>
        </div>
      </div>

      {stores.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-3 text-black">Store Cost Comparison</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stores.map(store => (
              <div 
                key={store.id} 
                className="flex flex-col p-3 rounded-lg border"
                style={{ borderLeftColor: store.color, borderLeftWidth: '4px' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Store className="h-4 w-4" style={{ color: store.color }} />
                  <span className="font-medium text-black">All from {store.name}</span>
                </div>
                <p className="text-lg font-bold text-black">
                  ${storeCosts[store.id]?.toFixed(2) || '0.00'}
                </p>
              </div>
            ))}
            
            {itemPreferredStoresTotalCost && (
              <div 
                className="flex flex-col p-3 rounded-lg border border-primary"
                style={{ borderLeftWidth: '4px' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Store className="h-4 w-4 text-primary" />
                  <span className="font-medium text-black">Your Selection</span>
                </div>
                <p className="text-lg font-bold text-primary">
                  ${itemPreferredStoresTotalCost}
                </p>
              </div>
            )}
          </div>
          
          <p className="text-sm text-black mt-3">
            Selecting the cheapest option for each item could save you up to 
            ${Math.max(0, parseFloat(selectedStoreTotal || '0') - parseFloat(itemPreferredStoresTotalCost || '0')).toFixed(2)} 
            compared to shopping at a single store.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShoppingListSummary;
