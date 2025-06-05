
import React from 'react';
import { usePantry } from '../context/usePantry';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddItemForm = () => {
  const { newItem, setNewItem, handleAddItem } = usePantry();
  
  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Add New Pantry Item</h3>
      <div className="mb-2">
        <Input
          type="text"
          className="w-full"
          placeholder="Ingredient Name"
          value={newItem.ingredientName}
          onChange={(e) => setNewItem({...newItem, ingredientName: e.target.value})}
        />
      </div>
      <div className="mb-2">
        <select
          className="w-full px-3 py-2 border rounded"
          value={newItem.category}
          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
        >
          <option value="Dry Goods">Dry Goods</option>
          <option value="Dairy & Eggs">Dairy & Eggs</option>
          <option value="Proteins">Proteins</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Spices & Seasonings">Spices & Seasonings</option>
          <option value="Oils & Vinegars">Oils & Vinegars</option>
          <option value="Bakery">Bakery</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-2 flex space-x-2">
        <Input
          type="number"
          className="w-1/2"
          placeholder="Quantity"
          value={newItem.currentQuantity}
          min="0"
          step="0.1"
          onChange={(e) => setNewItem({...newItem, currentQuantity: parseFloat(e.target.value)})}
        />
        <select
          className="w-1/2 px-3 py-2 border rounded"
          value={newItem.unit}
          onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
        >
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="L">L</option>
          <option value="ml">ml</option>
          <option value="each">each</option>
          <option value="dozen">dozen</option>
        </select>
      </div>
      <div className="mb-2">
        <Input
          type="text"
          className="w-full"
          placeholder="Storage Location"
          value={newItem.location}
          onChange={(e) => setNewItem({...newItem, location: e.target.value})}
        />
      </div>
      <div className="mb-2">
        <Input
          type="number"
          className="w-full"
          placeholder="Low Stock Threshold"
          value={newItem.lowStockThreshold}
          min="0"
          step="0.1"
          onChange={(e) => setNewItem({...newItem, lowStockThreshold: parseFloat(e.target.value)})}
        />
      </div>
      <Button
        className="w-full bg-blue-500 hover:bg-blue-600"
        onClick={handleAddItem}
      >
        Add to Pantry
      </Button>
    </div>
  );
};

export default AddItemForm;
