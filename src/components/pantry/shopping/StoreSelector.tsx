
import React from 'react';
import { Store, RefreshCw, MapPin } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { StoreWithLocations } from './hooks/types/storeTypes';
import { useStoreSettings } from './hooks/useStoreSettings';

interface StoreSelectorProps {
  selectedStore: string;
  onStoreChange: (storeId: string) => void;
}

const StoreSelector = ({ selectedStore, onStoreChange }: StoreSelectorProps) => {
  const { stores, defaultStoreId } = useStoreSettings();
  
  // Get selected store details
  const getSelectedStoreDetails = () => {
    const store = stores.find(s => s.id === selectedStore);
    return store ? (
      <div className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: store.color || '#888' }}
        />
        {store.name}
      </div>
    ) : (
      <span>Select store</span>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedStore} onValueChange={onStoreChange}>
        <SelectTrigger className="w-[180px]">
          <Store className="mr-2 h-4 w-4" />
          <SelectValue>{getSelectedStoreDetails()}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {stores.map(store => (
            <SelectGroup key={store.id}>
              <SelectItem 
                value={store.id}
                className="flex items-center"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: store.color || '#888' }}
                  />
                  {store.name}
                  {store.id === defaultStoreId && (
                    <span className="ml-1 text-xs text-muted-foreground">(Default)</span>
                  )}
                </div>
              </SelectItem>
              
              {store.locations.length > 0 && (
                <>
                  <SelectLabel className="text-xs pl-6 py-1">Locations:</SelectLabel>
                  {store.locations.map(location => (
                    <SelectItem 
                      key={location.id} 
                      value={`${store.id}-${location.id}`}
                      className="pl-6"
                    >
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {location.name}
                        {location.isPreferred && (
                          <span className="ml-1 text-xs text-muted-foreground">(Preferred)</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="h-9 w-9 rounded-md flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              onClick={() => {/* Would update prices */}}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Refresh prices (Last updated: {new Date().toLocaleDateString()})</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default StoreSelector;
