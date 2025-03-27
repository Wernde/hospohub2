
import { Store } from '../types';

// Updated store data with real stores and colors for visual differentiation
export const getStores = (): Store[] => [
  { id: 'aldi', name: 'Aldi', color: '#9b87f5' },   // Purple
  { id: 'woolworths', name: 'Woolworths', color: '#ea384c' },  // Red
  { id: 'coles', name: 'Coles', color: '#0EA5E9' },  // Teal
  { id: 'iga', name: 'IGA', color: '#EAB308' }  // Gold
];

// Function to fetch price data from store APIs (to be implemented with real API)
export const fetchStorePrices = async (itemId: string, storeIds: string[]) => {
  console.log('Fetching prices for item', itemId, 'from stores', storeIds);
  
  // Mock implementation - would be replaced with actual API calls
  // This would connect to each store's API to get current pricing
  return new Promise(resolve => {
    setTimeout(() => {
      const mockPrices: Record<string, number> = {};
      storeIds.forEach(storeId => {
        // Generate slightly different prices for each store
        const basePrice = Math.random() * 10 + 1;
        mockPrices[storeId] = parseFloat(basePrice.toFixed(2));
      });
      resolve(mockPrices);
    }, 500);
  });
};

// Function to check stock availability (to be implemented with real API)
export const checkStockAvailability = async (itemId: string, storeIds: string[]) => {
  console.log('Checking stock for item', itemId, 'at stores', storeIds);
  
  // Mock implementation - would be replaced with actual API calls
  return new Promise(resolve => {
    setTimeout(() => {
      const mockAvailability: Record<string, string> = {};
      storeIds.forEach(storeId => {
        // Random stock status for demo purposes
        const random = Math.random();
        let status = 'in-stock';
        if (random < 0.1) status = 'out-of-stock';
        else if (random < 0.3) status = 'limited';
        mockAvailability[storeId] = status;
      });
      resolve(mockAvailability);
    }, 300);
  });
};

// Function to get AI suggestions for shopping optimization
export const getAISuggestions = async (items: any[], selectedStores: Record<string, string>) => {
  console.log('Getting AI suggestions for shopping list');
  
  // Mock implementation - would be replaced with actual AI API calls
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        suggestions: [
          "Consider buying all produce items from Aldi for better value",
          "Woolworths has a special on baking goods this week",
          "Coles is currently out of stock on some meat items - check before visiting"
        ],
        savingTips: [
          "Buying all dairy products from Aldi would save you approximately $4.50",
          "Consider substituting brand items with store-brand alternatives"
        ]
      });
    }, 700);
  });
};
