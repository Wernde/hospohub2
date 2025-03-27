
import { useState, useEffect, useCallback } from 'react';
import { ShoppingItem } from './types';
import { fetchStorePrices, checkStockAvailability } from './utils/storeData';

export const useStoreData = (items: ShoppingItem[], stores: any[]) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [itemPrices, setItemPrices] = useState<Record<string, Record<string, number>>>({});
  const [stockStatus, setStockStatus] = useState<Record<string, Record<string, string>>>({});
  
  // Load prices and stock data for all items
  const loadAllItemData = useCallback(async () => {
    if (!items.length || !stores.length) return;
    
    setIsLoading(true);
    const storeIds = stores.map(store => store.id);
    
    try {
      // Process items in batches to avoid overwhelming the APIs
      const batchSize = 5;
      const batches = Math.ceil(items.length / batchSize);
      
      for (let i = 0; i < batches; i++) {
        const batchItems = items.slice(i * batchSize, (i + 1) * batchSize);
        
        // Fetch prices and stock status for each item in parallel
        await Promise.all(batchItems.map(async (item) => {
          const [prices, stock] = await Promise.all([
            fetchStorePrices(item.id, storeIds),
            checkStockAvailability(item.id, storeIds)
          ]);
          
          setItemPrices(prev => ({
            ...prev,
            [item.id]: prices as Record<string, number>
          }));
          
          setStockStatus(prev => ({
            ...prev,
            [item.id]: stock as Record<string, string>
          }));
        }));
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading store data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [items, stores]);
  
  // Initial data load
  useEffect(() => {
    loadAllItemData();
  }, [loadAllItemData]);
  
  // Apply prices to items
  const itemsWithPrices = useCallback(() => {
    return items.map(item => ({
      ...item,
      prices: itemPrices[item.id] || {}
    }));
  }, [items, itemPrices]);
  
  // Get stock status for an item at a specific store
  const getStockStatus = useCallback((itemId: string, storeId: string): 'in-stock' | 'limited' | 'out-of-stock' => {
    return (stockStatus[itemId]?.[storeId] as any) || 'in-stock';
  }, [stockStatus]);
  
  // Get all store data for an item
  const getItemStoreData = useCallback((itemId: string) => {
    return stores.map(store => ({
      storeId: store.id,
      storeName: store.name,
      price: itemPrices[itemId]?.[store.id] || 0,
      color: store.color,
      stockStatus: getStockStatus(itemId, store.id)
    }));
  }, [stores, itemPrices, getStockStatus]);
  
  // Find best price store for an item
  const getBestPriceStore = useCallback((itemId: string) => {
    const prices = stores.map(store => ({
      storeId: store.id,
      price: itemPrices[itemId]?.[store.id] || 0,
    }));
    
    return prices.sort((a, b) => a.price - b.price)[0]?.storeId;
  }, [stores, itemPrices]);
  
  // Manually refresh data
  const refreshData = useCallback(() => {
    return loadAllItemData();
  }, [loadAllItemData]);
  
  return {
    isLoading,
    lastUpdated,
    itemsWithPrices,
    getStockStatus,
    getItemStoreData,
    getBestPriceStore,
    refreshData
  };
};
