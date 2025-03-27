
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import PreferredStoreDisplay from './PreferredStoreDisplay';
import QuantityEditor from './QuantityEditor';
import StoreOptionsList from './StoreOptionsList';

interface StoreViewItemProps {
  item: any;
  isPurchased: boolean;
  isEditing: boolean;
  editedQuantity: number;
  preferredStore: string;
  stores: any[];
  storePrices: any[];
  togglePurchased: (id: string) => void;
  startEditing: (item: any) => void;
  setEditedQuantity: (quantity: number) => void;
  saveEditedQuantity: (item: any) => void;
  removeItem: (item: any) => void;
  setItemPreferredStore?: (itemId: string, storeId: string) => void;
}

const StoreViewItem = ({
  item,
  isPurchased,
  isEditing,
  editedQuantity,
  preferredStore,
  stores,
  storePrices,
  togglePurchased,
  startEditing,
  setEditedQuantity,
  saveEditedQuantity,
  removeItem,
  setItemPreferredStore
}: StoreViewItemProps) => {
  const preferredStoreObj = stores.find(s => s.id === preferredStore);
  
  return (
    <TableRow 
      className={isPurchased ? "bg-muted/50" : ""}
    >
      <TableCell>
        <Checkbox 
          checked={isPurchased} 
          onCheckedChange={() => togglePurchased(item.id)}
        />
      </TableCell>
      
      <TableCell className={isPurchased ? "line-through text-muted-foreground" : ""}>
        <div className="font-medium">{item.name}</div>
        <div className="text-xs text-muted-foreground">
          Category: {item.category}
        </div>
      </TableCell>
      
      <TableCell className={isPurchased ? "line-through text-muted-foreground" : ""}>
        <div className="text-sm">
          {item.recipes.map((recipe: string, idx: number) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                {recipe}
              </span>
            </div>
          ))}
        </div>
      </TableCell>
      
      <TableCell className={isPurchased ? "line-through text-muted-foreground" : ""}>
        <QuantityEditor
          isEditing={isEditing}
          quantity={item.quantity}
          unit={item.unit}
          editedQuantity={editedQuantity}
          onQuantityChange={setEditedQuantity}
          onSave={() => saveEditedQuantity(item)}
          onStartEdit={() => startEditing(item)}
        />
      </TableCell>
      
      <TableCell>
        <PreferredStoreDisplay
          preferredStore={preferredStore}
          storeColor={preferredStoreObj?.color || '#888'}
          storeName={preferredStoreObj?.name || ''}
        />
      </TableCell>
      
      <TableCell>
        <StoreOptionsList
          itemId={item.id}
          storePrices={storePrices}
          preferredStore={preferredStore}
          onStoreSelect={(itemId, storeId) => setItemPreferredStore && setItemPreferredStore(itemId, storeId)}
        />
      </TableCell>
      
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default StoreViewItem;
