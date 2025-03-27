
import React from 'react';
import { Store } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';

export interface Store {
  id: string;
  name: string;
}

interface StoreSelectorProps {
  stores: Store[];
  selectedStore: string;
  onStoreChange: (storeId: string) => void;
}

const StoreSelector = ({ stores, selectedStore, onStoreChange }: StoreSelectorProps) => {
  return (
    <div className="flex items-center">
      <Select value={selectedStore} onValueChange={onStoreChange}>
        <SelectTrigger className="w-[180px]">
          <Store className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Select store" />
        </SelectTrigger>
        <SelectContent>
          {stores.map(store => (
            <SelectItem key={store.id} value={store.id}>
              {store.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StoreSelector;
