
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Store, PackageCheck, AlertCircle, Truck } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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

  // Get stock status icon
  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <PackageCheck className="h-3 w-3 text-green-500" />;
      case 'limited':
        return <AlertCircle className="h-3 w-3 text-amber-500" />;
      case 'out-of-stock':
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return <PackageCheck className="h-3 w-3 text-green-500" />;
    }
  };

  // Get stock status text
  const getStockStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'In Stock';
      case 'limited':
        return 'Limited Stock';
      case 'out-of-stock':
        return 'Out of Stock';
      default:
        return 'In Stock';
    }
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
              <TableRow 
                key={item.id} 
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
                  {isEditing ? (
                    <div className="flex space-x-2 items-center">
                      <Input
                        type="number"
                        value={editedQuantity}
                        onChange={(e) => setEditedQuantity(Number(e.target.value))}
                        className="w-20"
                        min={0}
                        step={0.1}
                      />
                      <Button 
                        size="sm" 
                        onClick={() => saveEditedQuantity(item)}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="cursor-pointer hover:text-primary"
                      onClick={() => startEditing(item)}
                    >
                      {item.quantity} {item.unit}
                    </div>
                  )}
                </TableCell>
                
                <TableCell>
                  {preferredStore && (
                    <div className="flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ 
                          backgroundColor: stores.find(s => s.id === preferredStore)?.color || '#888' 
                        }}
                      />
                      <span className="font-medium">{stores.find(s => s.id === preferredStore)?.name}</span>
                    </div>
                  )}
                </TableCell>
                
                <TableCell>
                  <RadioGroup 
                    value={preferredStore}
                    onValueChange={(value) => setItemPreferredStore && setItemPreferredStore(item.id, value)}
                    className="flex flex-col space-y-1"
                  >
                    {storePrices.map(storePrice => (
                      <div key={storePrice.storeId} className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={storePrice.storeId} 
                            id={`${item.id}-${storePrice.storeId}`}
                            className="border-2"
                            style={{ borderColor: storePrice.color }}
                          />
                          <Label 
                            htmlFor={`${item.id}-${storePrice.storeId}`}
                            className="flex items-center gap-2 cursor-pointer text-sm"
                          >
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: storePrice.color }}
                            ></div>
                            <span className="w-24">{storePrice.storeName}</span>
                            <span className="font-semibold">${storePrice.price.toFixed(2)}/{item.unit}</span>
                            <span className="flex items-center gap-1 text-xs">
                              {getStockStatusIcon(storePrice.stockStatus)}
                              {getStockStatusText(storePrice.stockStatus)}
                            </span>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
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
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreView;
