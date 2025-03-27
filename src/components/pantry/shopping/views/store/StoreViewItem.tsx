
import React, { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Info } from 'lucide-react';
import PreferredStoreDisplay from './PreferredStoreDisplay';
import QuantityEditor from './QuantityEditor';
import StoreOptionsList from './StoreOptionsList';
import { fetchProductDetails } from '../../hooks/utils/storeData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
  const [productDetails, setProductDetails] = useState<any>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Fetch product details when preferred store changes
  useEffect(() => {
    if (preferredStore) {
      setIsLoadingDetails(true);
      fetchProductDetails(item.id, preferredStore)
        .then(details => {
          setProductDetails(details);
          setIsLoadingDetails(false);
        })
        .catch(err => {
          console.error('Error fetching product details:', err);
          setIsLoadingDetails(false);
        });
    }
  }, [item.id, preferredStore]);
  
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
        {productDetails && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center mt-1 text-xs text-blue-500 cursor-help">
                  <Info className="h-3 w-3 mr-1" />
                  {productDetails.brandName} - {productDetails.size}
                </div>
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Brand:</span>
                    <span>{productDetails.brandName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Size:</span>
                    <span>{productDetails.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Store Product ID:</span>
                    <span className="text-xs">{productDetails.storeProductId}</span>
                  </div>
                  <div className="pt-1 border-t">
                    <span className="font-semibold">Nutrition per 100g:</span>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                      <div>Calories: {productDetails.nutritionInfo.calories}kcal</div>
                      <div>Protein: {productDetails.nutritionInfo.protein}g</div>
                      <div>Carbs: {productDetails.nutritionInfo.carbs}g</div>
                      <div>Fat: {productDetails.nutritionInfo.fat}g</div>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
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
