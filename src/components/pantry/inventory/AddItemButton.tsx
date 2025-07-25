
import React from 'react';
import { Plus } from 'lucide-react';
import { usePantry } from '../PantryContext';
import { Button } from '@/components/ui/button';

const AddItemButton = () => {
  const { showAddItemForm, setShowAddItemForm } = usePantry();
  
  return (
    <Button 
      className="w-full mb-4 bg-amber-500 hover:bg-amber-600 text-white"
      variant="default"
      onClick={() => setShowAddItemForm(!showAddItemForm)}
    >
      <Plus size={20} className="mr-2" />
      {showAddItemForm ? 'Cancel' : 'Add New Item'}
    </Button>
  );
};

export default AddItemButton;
