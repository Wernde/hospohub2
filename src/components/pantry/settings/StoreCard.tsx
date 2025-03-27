
import React, { useState } from 'react';
import { Check, MapPin, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StoreWithLocations } from '../shopping/hooks/types/storeTypes';
import { StoreLocationsList } from './StoreLocationsList';
import { useStoreDialog } from './hooks/useStoreDialog';

interface StoreCardProps {
  store: StoreWithLocations;
  isDefault: boolean;
  onRemoveStore: (storeId: string) => void;
  onAddLocation: (storeId: string) => void;
  onRemoveLocation: (storeId: string, locationId: string) => void;
  onTogglePreferred: (storeId: string, locationId: string) => void;
  onSetDefault: (storeId: string, locationId: string) => void;
  onConnectAccount: (storeId: string) => void;
}

export const StoreCard = ({
  store,
  isDefault,
  onRemoveStore,
  onAddLocation,
  onRemoveLocation,
  onTogglePreferred,
  onSetDefault,
  onConnectAccount
}: StoreCardProps) => {
  const { setShowAddLocation } = useStoreDialog();

  return (
    <Card className={isDefault ? "border-primary" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: store.color || '#888' }} />
            <CardTitle>{store.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {isDefault && (
              <Badge variant="default">Default</Badge>
            )}
            <Button variant="ghost" size="icon" onClick={() => onRemoveStore(store.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
        <CardDescription>
          {store.accountConnected ? (
            <span className="flex items-center text-green-600">
              <Check className="mr-1 h-3 w-3" /> 
              Connected (Loyalty #: {store.loyaltyNumber})
            </span>
          ) : (
            <Button 
              variant="link" 
              className="p-0 h-auto text-sm" 
              onClick={() => onConnectAccount(store.id)}
            >
              Connect store account
            </Button>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Locations</h4>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onAddLocation(store.id)}
            >
              <PlusCircle className="mr-2 h-3 w-3" />
              Add Location
            </Button>
          </div>
          
          <StoreLocationsList 
            store={store}
            onRemoveLocation={onRemoveLocation}
            onTogglePreferred={onTogglePreferred}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            const defaultLocation = store.locations.length > 0 ? 
              store.locations.find(l => l.isPreferred)?.id || store.locations[0].id : 
              '';
            onSetDefault(store.id, defaultLocation);
          }}
          disabled={isDefault || store.locations.length === 0}
        >
          Set as Default Store
        </Button>
      </CardFooter>
    </Card>
  );
};
