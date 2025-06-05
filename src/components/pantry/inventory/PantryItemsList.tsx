
import React from 'react';
import { usePantry } from '../context/usePantry';
import PantryCategoryGroup from './PantryCategoryGroup';

const PantryItemsList = () => {
  const { pantryItems, searchTerm, filter } = usePantry();
  
  // Filter pantry items based on search and filter
  const filteredPantryItems = pantryItems.filter(item => {
    // Apply search filter
    const matchesSearch = item.ingredientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply category filter
    if (filter === 'low-stock') {
      return matchesSearch && item.isLowStock;
    } else if (filter === 'expiring') {
      const today = new Date();
      const expiry = new Date(item.expirationDate);
      const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return matchesSearch && daysUntilExpiry <= 14;
    }
    
    return matchesSearch;
  });
  
  // Group pantry items by category
  const groupedPantryItems = filteredPantryItems.reduce((groups: Record<string, any[]>, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {});
  
  return (
    <div>
      {Object.keys(groupedPantryItems).length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No items match your search
        </div>
      )}
      
      {Object.entries(groupedPantryItems).map(([category, items]) => (
        <PantryCategoryGroup 
          key={category} 
          category={category} 
          items={items} 
        />
      ))}
    </div>
  );
};

export default PantryItemsList;
