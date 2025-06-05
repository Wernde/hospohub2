
import React from 'react';
import { Search } from 'lucide-react';
import { usePantry } from '../context/usePantry';
import { Input } from '@/components/ui/input';

const PantrySearch = () => {
  const { searchTerm, setSearchTerm } = usePantry();
  
  return (
    <div className="relative flex-grow mb-2">
      <Input
        className="w-full pl-10 pr-4 py-2"
        placeholder="Search ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default PantrySearch;
