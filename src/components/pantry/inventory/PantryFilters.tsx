
import React from 'react';
import { usePantry } from '../PantryContext';

const PantryFilters = () => {
  const { filter, setFilter } = usePantry();
  
  return (
    <div className="flex mb-4 space-x-2">
      <button
        className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-stone-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={`px-3 py-1 rounded ${filter === 'low-stock' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('low-stock')}
      >
        Low Stock
      </button>
      <button
        className={`px-3 py-1 rounded ${filter === 'expiring' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('expiring')}
      >
        Expiring Soon
      </button>
    </div>
  );
};

export default PantryFilters;
