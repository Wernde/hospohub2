
import { useState } from 'react';

export const useItemEditing = () => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  
  return {
    editingItem,
    editedQuantity,
    setEditingItem,
    setEditedQuantity
  };
};
