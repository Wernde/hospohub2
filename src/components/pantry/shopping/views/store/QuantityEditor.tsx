
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface QuantityEditorProps {
  isEditing: boolean;
  quantity: number;
  unit: string;
  editedQuantity: number;
  onQuantityChange: (quantity: number) => void;
  onSave: () => void;
  onStartEdit: () => void;
}

const QuantityEditor = ({
  isEditing,
  quantity,
  unit,
  editedQuantity,
  onQuantityChange,
  onSave,
  onStartEdit
}: QuantityEditorProps) => {
  return isEditing ? (
    <div className="flex space-x-2 items-center">
      <Input
        type="number"
        value={editedQuantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        className="w-20"
        min={0}
        step={0.1}
      />
      <Button 
        size="sm" 
        onClick={onSave}
      >
        Save
      </Button>
    </div>
  ) : (
    <div 
      className="cursor-pointer hover:text-primary"
      onClick={onStartEdit}
    >
      {quantity} {unit}
    </div>
  );
};

export default QuantityEditor;
