
import React from 'react';
import { MapPin, Trash2 } from 'lucide-react';
import { StoreWithLocations } from '../shopping/hooks/types/storeTypes';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface StoreLocationsListProps {
  store: StoreWithLocations;
  onRemoveLocation: (storeId: string, locationId: string) => void;
  onTogglePreferred: (storeId: string, locationId: string) => void;
}

export const StoreLocationsList = ({ 
  store,
  onRemoveLocation,
  onTogglePreferred 
}: StoreLocationsListProps) => {
  if (store.locations.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-2">
        No locations added yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {store.locations.map(location => (
        <div 
          key={location.id} 
          className="flex justify-between items-start p-3 border rounded-md"
        >
          <div>
            <div className="font-medium text-sm flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location.name}
              {location.isPreferred && (
                <Badge variant="outline" className="ml-1 text-xs">Preferred</Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {location.address}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Switch
                id={`preferred-${location.id}`}
                checked={location.isPreferred}
                onCheckedChange={() => onTogglePreferred(store.id, location.id)}
              />
              <Label htmlFor={`preferred-${location.id}`} className="text-xs">
                Preferred
              </Label>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => onRemoveLocation(store.id, location.id)}
            >
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
