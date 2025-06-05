
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { usePantry } from '../PantryContext';
import PantryItem from './PantryItem';
import { PantryItem as PantryItemType } from '../types';

interface PantryCategoryGroupProps {
  category: string;
  items: PantryItemType[];
}

const PantryCategoryGroup: React.FC<PantryCategoryGroupProps> = ({ category, items }) => {
  const { expandedCategories, toggleCategory } = usePantry();
  
  return (
    <div className="mb-4">
      <div 
        className="flex items-center bg-gray-100 p-2 rounded cursor-pointer"
        onClick={() => toggleCategory(category)}
      >
        {expandedCategories[category] ? 
          <ChevronDown className="h-5 w-5 text-gray-500 mr-2" /> : 
          <ChevronRight className="h-5 w-5 text-gray-500 mr-2" />
        }
        <h3 className="font-bold">{category} ({items.length})</h3>
      </div>
      
      {expandedCategories[category] && (
        <div className="mt-2 space-y-2">
          {items.map(item => (
            <PantryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PantryCategoryGroup;
