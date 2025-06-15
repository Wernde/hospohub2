
import React from 'react';
import { AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import { usePantry } from '../PantryContext';
import { PantryItem as PantryItemType } from '../types';

interface PantryItemProps {
  item: PantryItemType;
}

const PantryItem: React.FC<PantryItemProps> = ({ item }) => {
  const { updatePantryQuantity, removePantryItem } = usePantry();
  
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="mr-2">
            {item.isLowStock ? (
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div>
            <h4 className="font-semibold">{item.ingredientName}</h4>
            <div className="text-sm text-gray-500">
              Location: {item.location || 'Not specified'}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              className="w-16 px-2 py-1 border border-gray-400 bg-gray-100 rounded text-right text-gray-900"
              value={item.currentQuantity}
              min="0"
              step="0.1"
              onChange={(e) => updatePantryQuantity(item.id, parseFloat(e.target.value))}
            />
            <span>{item.unit}</span>
            <button 
              className="p-1 text-red-500 hover:bg-red-50 rounded"
              onClick={() => removePantryItem(item.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="text-sm">
            {item.isLowStock ? (
              <span className="text-yellow-500">
                Low Stock (Min: {item.lowStockThreshold} {item.unit})
              </span>
            ) : (
              <span className="text-green-500">
                In Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantryItem;
