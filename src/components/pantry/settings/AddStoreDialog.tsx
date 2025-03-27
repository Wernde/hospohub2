
import React from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddStoreDialogProps {
  storeName: string;
  storeColor: string;
  onStoreNameChange: (name: string) => void;
  onStoreColorChange: (color: string) => void;
  onAddStore: () => void;
  onCancel: () => void;
}

export const AddStoreDialog = ({
  storeName,
  storeColor,
  onStoreNameChange,
  onStoreColorChange,
  onAddStore,
  onCancel
}: AddStoreDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Store</DialogTitle>
        <DialogDescription>
          Enter the details for the store you want to add.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="store-name">Store Name</Label>
          <Input 
            id="store-name"
            placeholder="Enter store name" 
            value={storeName}
            onChange={(e) => onStoreNameChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="store-color">Store Color</Label>
          <div className="flex gap-2">
            <Input 
              id="store-color"
              type="color"
              className="w-16 h-10 p-1"
              value={storeColor}
              onChange={(e) => onStoreColorChange(e.target.value)}
            />
            <div 
              className="h-10 flex-1 rounded-md border"
              style={{ backgroundColor: storeColor }}
            ></div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onAddStore}>Add Store</Button>
      </DialogFooter>
    </DialogContent>
  );
};
