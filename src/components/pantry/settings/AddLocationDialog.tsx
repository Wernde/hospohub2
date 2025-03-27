
import React from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddLocationDialogProps {
  locationName: string;
  locationAddress: string;
  onLocationNameChange: (name: string) => void;
  onLocationAddressChange: (address: string) => void;
  onAddLocation: () => void;
  onCancel: () => void;
}

export const AddLocationDialog = ({
  locationName,
  locationAddress,
  onLocationNameChange,
  onLocationAddressChange,
  onAddLocation,
  onCancel
}: AddLocationDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogDescription>
          Enter the details for the location you want to add.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="location-name">Location Name</Label>
          <Input 
            id="location-name"
            placeholder="Enter location name (e.g., Downtown)" 
            value={locationName}
            onChange={(e) => onLocationNameChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location-address">Address</Label>
          <Input 
            id="location-address"
            placeholder="Enter full address" 
            value={locationAddress}
            onChange={(e) => onLocationAddressChange(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onAddLocation}>
          Add Location
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
