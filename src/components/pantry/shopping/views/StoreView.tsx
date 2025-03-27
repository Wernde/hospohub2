
import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StoreViewItem from './store/StoreViewItem';
import { useStoreData } from '../hooks/useStoreData';

interface StoreViewProps {
  stores: any[];
  aggregatedList: any[];
  purchasedItems: Record<string, boolean>;
  editingItem: string | null;
  editedQuantity: number;
  selectedStore: string;
  togglePurchased: (id: string) => void;
  startEditing: (item: any) => void;
  setEditedQuantity: (quantity: number) => void;
  saveEditedQuantity: (item: any) => void;
  removeItem: (item: any) => void;
  setItemPreferredStore?: (itemId: string, storeId: string) => void;
  itemPreferredStores?: Record<string, string>;
}

const StoreView = ({
  stores,
  aggregatedList,
  purchasedItems,
  editingItem,
  editedQuantity,
  selectedStore,
  togglePurchased,
  startEditing,
  setEditedQuantity,
  saveEditedQuantity,
  removeItem,
  setItemPreferredStore,
  itemPreferredStores = {},
}: StoreViewProps) => {
  // Use our hook to get store data for all items
  const { 
    getItemStoreData, 
    getBestPriceStore 
  } = useStoreData(aggregatedList, stores);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Recipe(s)</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Preferred Store</TableHead>
            <TableHead>Store Options</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aggregatedList.map((item) => {
            const isPurchased = purchasedItems[item.id];
            const isEditing = editingItem === item.id;
            const bestPriceStore = getBestPriceStore(item.id);
            const storePrices = getItemStoreData(item.id);
            const preferredStore = itemPreferredStores[item.id] || bestPriceStore;
            
            return (
              <StoreViewItem
                key={item.id}
                item={item}
                isPurchased={isPurchased}
                isEditing={isEditing}
                editedQuantity={editedQuantity}
                preferredStore={preferredStore}
                stores={stores}
                storePrices={storePrices}
                togglePurchased={togglePurchased}
                startEditing={startEditing}
                setEditedQuantity={setEditedQuantity}
                saveEditedQuantity={saveEditedQuantity}
                removeItem={removeItem}
                setItemPreferredStore={setItemPreferredStore}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreView;
