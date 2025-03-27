
import React from 'react';
import { Store, RefreshCw } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Store as StoreType } from './hooks/useShoppingListState';

interface StoreSelectorProps {
  stores: StoreType[];
  selectedStore: string;
  onStoreChange: (storeId: string) => void;
}

const StoreSelector = ({ stores, selectedStore, onStoreChange }: StoreSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={selectedStore} onValueChange={onStoreChange}>
        <SelectTrigger className="w-[180px]">
          <Store className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Select store" />
        </SelectTrigger>
        <SelectContent>
          {stores.map(store => (
            <SelectItem 
              key={store.id} 
              value={store.id}
              className="flex items-center"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: store.color || '#888' }}
                />
                {store.name}
              </div>
            </SelectItem>
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
