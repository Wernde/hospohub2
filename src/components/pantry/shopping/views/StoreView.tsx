
import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StoreViewItem from './store/StoreViewItem';

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
  // Get all store prices for comparison
  const getStorePrices = (item: any) => {
    return stores.map(store => {
      // Simulate different stock statuses for demonstration
      let stockStatus = 'in-stock';
      const random = Math.random();
      if (random < 0.1) stockStatus = 'out-of-stock';
      else if (random < 0.3) stockStatus = 'limited';
      
      return {
        storeId: store.id,
        storeName: store.name,
        price: item.prices?.[store.id] || 0,
        color: store.color,
        stockStatus
      };
    });
  };

  // Get best price store for an item
  const getBestPriceStore = (item: any) => {
    const prices = stores.map(store => ({
      storeId: store.id,
      price: item.prices?.[store.id] || 0,
    }));
    
    return prices.sort((a, b) => a.price - b.price)[0]?.storeId;
  };

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
            const bestPriceStore = getBestPriceStore(item);
            const storePrices = getStorePrices(item);
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
