
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PackageCheck, AlertCircle } from 'lucide-react';

interface StorePrice {
  storeId: string;
  storeName: string;
  price: number;
  color: string;
  stockStatus: string;
}

interface StoreOptionsListProps {
  itemId: string;
  storePrices: StorePrice[];
  preferredStore: string;
  onStoreSelect: (itemId: string, storeId: string) => void;
}

const StoreOptionsList = ({
  itemId,
  storePrices,
  preferredStore,
  onStoreSelect
}: StoreOptionsListProps) => {
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
    <RadioGroup 
      value={preferredStore}
      onValueChange={(value) => onStoreSelect(itemId, value)}
      className="flex flex-col space-y-1"
    >
      {storePrices.map(storePrice => (
        <div key={storePrice.storeId} className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value={storePrice.storeId} 
              id={`${itemId}-${storePrice.storeId}`}
              className="border-2"
              style={{ borderColor: storePrice.color }}
            />
            <Label 
              htmlFor={`${itemId}-${storePrice.storeId}`}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: storePrice.color }}
              ></div>
              <span className="w-24">{storePrice.storeName}</span>
              <span className="font-semibold">${storePrice.price.toFixed(2)}</span>
              <span className="flex items-center gap-1 text-xs">
                {getStockStatusIcon(storePrice.stockStatus)}
                {getStockStatusText(storePrice.stockStatus)}
              </span>
            </Label>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default StoreOptionsList;
