
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
import { Store, PackageCheck, AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

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
}: StoreViewProps) => {
  // Get all store prices for comparison
  const getStorePrices = (item: any) => {
    return stores.map(store => ({
      storeId: store.id,
      storeName: store.name,
      price: item.prices?.[store.id] || 0,
      color: store.color,
      inStock: Math.random() > 0.2, // Simulated in-stock status for demo
    }));
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
            <TableHead>Best Price At</TableHead>
            <TableHead>Price Comparison</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aggregatedList.map((item) => {
            const isPurchased = purchasedItems[item.id];
            const isEditing = editingItem === item.id;
            const bestPriceStore = getBestPriceStore(item);
            const storePrices = getStorePrices(item);
            
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
                  {bestPriceStore && (
                    <div className="flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ 
                          backgroundColor: stores.find(s => s.id === bestPriceStore)?.color || '#888' 
                        }}
                      />
                      <span>{stores.find(s => s.id === bestPriceStore)?.name}</span>
                    </div>
                  )}
                </TableCell>
                
                <TableCell>
                  <div className="flex space-x-2">
                    {storePrices.map(storePrice => (
                      <TooltipProvider key={storePrice.storeId}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                                storePrice.storeId === selectedStore 
                                  ? 'bg-primary/20 font-medium' 
                                  : 'bg-muted'
                              }`}
                              style={{ borderLeft: `3px solid ${storePrice.color || '#888'}` }}
                            >
                              ${(storePrice.price * item.quantity).toFixed(2)}
                              {storePrice.inStock ? (
                                <PackageCheck className="h-3 w-3 text-green-500" />
                              ) : (
                                <AlertCircle className="h-3 w-3 text-amber-500" />
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{storePrice.storeName}: ${storePrice.price.toFixed(2)} per {item.unit}</p>
                            <p className="text-xs text-muted-foreground">
                              {storePrice.inStock ? 'In stock' : 'Limited stock'}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
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
