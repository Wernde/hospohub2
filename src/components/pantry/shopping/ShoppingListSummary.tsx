
import React from 'react';
import { DollarSign, ShoppingCart, Tag, Calendar } from 'lucide-react';

interface ShoppingListSummaryProps {
  totalCost: string;
  totalItems: number;
  itemsByCategory: Record<string, any[]>;
  itemsByRecipe: Record<string, any[]>;
}

const ShoppingListSummary = ({
  totalCost,
  totalItems,
  itemsByCategory,
  itemsByRecipe
}: ShoppingListSummaryProps) => {
  // Count number of categories and recipes
  const categoryCount = Object.keys(itemsByCategory).length;
  const recipeCount = Object.keys(itemsByRecipe).length;

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-semibold mb-3">Shopping Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center p-3 bg-blue-50 rounded-lg">
          <DollarSign className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Total Cost</p>
            <p className="text-xl font-bold">${totalCost}</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-green-50 rounded-lg">
          <ShoppingCart className="h-8 w-8 text-green-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="text-xl font-bold">{totalItems}</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-purple-50 rounded-lg">
          <Tag className="h-8 w-8 text-purple-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Categories</p>
            <p className="text-xl font-bold">{categoryCount}</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-orange-50 rounded-lg">
          <Calendar className="h-8 w-8 text-orange-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Recipes</p>
            <p className="text-xl font-bold">{recipeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListSummary;
