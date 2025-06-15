
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const EmptyShoppingList = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
      <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-black mb-2">Your shopping list is empty</h3>
      <p className="text-black">
        Items that need to be ordered will appear here
      </p>
    </div>
  );
};

export default EmptyShoppingList;
