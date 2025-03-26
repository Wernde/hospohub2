
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { usePantry } from '../PantryContext';
import { Button } from '@/components/ui/button';

const ShoppingList = () => {
  const { shoppingList } = usePantry();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Shopping List</h2>
        <div className="flex space-x-2">
          <Button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <ShoppingBag className="h-4 w-4 mr-1" />
            <span>View Complete List</span>
          </Button>
        </div>
      </div>
      
      {shoppingList.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Your shopping list is empty</h3>
          <p className="text-gray-400">
            Items that need to be ordered will appear here
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4 font-medium">Ingredient</th>
                <th className="p-4 font-medium">Quantity</th>
                <th className="p-4 font-medium">For Recipe</th>
                <th className="p-4 font-medium">Class</th>
              </tr>
            </thead>
            <tbody>
              {shoppingList.map(item => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.quantity} {item.unit}</td>
                  <td className="p-4">{item.recipes.join(', ')}</td>
                  <td className="p-4">{item.className}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
