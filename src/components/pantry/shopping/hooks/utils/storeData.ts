
import { Store, StoreWithLocations } from '../types/storeTypes';

// Updated store data with real stores and colors for visual differentiation
export const getStores = (): Store[] => [
  { id: 'aldi', name: 'Aldi', color: '#9b87f5' },   // Purple
  { id: 'woolworths', name: 'Woolworths', color: '#ea384c' },  // Red
  { id: 'coles', name: 'Coles', color: '#0EA5E9' },  // Teal
  { id: 'iga', name: 'IGA', color: '#EAB308' }  // Gold
];

// Get store with locations - this would be replaced with user preferences from a database
export const getStoresWithLocations = (): StoreWithLocations[] => [
  { 
    id: 'aldi', 
    name: 'Aldi', 
    color: '#9b87f5',
    accountConnected: false,
    locations: [
      { id: 'aldi-1', name: 'Aldi City Central', address: '123 Main St', isPreferred: true },
      { id: 'aldi-2', name: 'Aldi Westfield', address: '456 Shopping Ave', isPreferred: false }
    ]
  },
  { 
    id: 'woolworths', 
    name: 'Woolworths', 
    color: '#ea384c',
    accountConnected: true,
    loyaltyNumber: '1234567890',
    locations: [
      { id: 'woolworths-1', name: 'Woolworths Metro CBD', address: '789 City Rd', isPreferred: true },
      { id: 'woolworths-2', name: 'Woolworths Suburban Mall', address: '101 Suburb St', isPreferred: false }
    ]
  },
  { 
    id: 'coles', 
    name: 'Coles', 
    color: '#0EA5E9',
    accountConnected: false,
    locations: [
      { id: 'coles-1', name: 'Coles Plaza', address: '202 Shopping Blvd', isPreferred: false }
    ]
  },
  { 
    id: 'iga', 
    name: 'IGA', 
    color: '#EAB308',
    accountConnected: false,
    locations: [
      { id: 'iga-1', name: 'IGA Local', address: '303 Neighborhood Ave', isPreferred: false }
    ]
  }
];

// This would be replaced with real API calls to store price APIs
export const fetchStorePrices = async (itemId: string, storeIds: string[]) => {
  console.log('Fetching prices for item', itemId, 'from stores', storeIds);
  
  // Create a stable but different price for each item at each store based on item ID
  // This makes the mock data consistent between renders but different per store
  const generateStablePrice = (itemId: string, storeId: string) => {
    const stableRandomFactor = hashStringToFloat(`${itemId}-${storeId}`);
    const basePrice = 1.99 + stableRandomFactor * 8;
    
    // Store-specific pricing patterns
    const storeFactors: Record<string, number> = {
      'aldi': 0.85,          // Aldi usually cheaper
      'woolworths': 1.1,     // Woolworths usually more expensive
      'coles': 1.05,         // Coles slightly more expensive
      'iga': 1.15            // IGA usually most expensive
    };
    
    return parseFloat((basePrice * (storeFactors[storeId] || 1)).toFixed(2));
  };
  
  return new Promise(resolve => {
    setTimeout(() => {
      const mockPrices: Record<string, number> = {};
      storeIds.forEach(storeId => {
        mockPrices[storeId] = generateStablePrice(itemId, storeId);
      });
      resolve(mockPrices);
    }, 300);
  });
};

// Function to check stock availability (would be replaced with real API)
export const checkStockAvailability = async (itemId: string, storeIds: string[]) => {
  console.log('Checking stock for item', itemId, 'at stores', storeIds);
  
  // Generate stable but different stock statuses
  const generateStableStockStatus = (itemId: string, storeId: string) => {
    const random = hashStringToFloat(`stock-${itemId}-${storeId}`);
    let status = 'in-stock';
    if (random < 0.1) status = 'out-of-stock';
    else if (random < 0.3) status = 'limited';
    return status;
  };
  
  return new Promise(resolve => {
    setTimeout(() => {
      const mockAvailability: Record<string, string> = {};
      storeIds.forEach(storeId => {
        mockAvailability[storeId] = generateStableStockStatus(itemId, storeId);
      });
      resolve(mockAvailability);
    }, 200);
  });
};

// Function to get specific product details from store API
export const fetchProductDetails = async (itemId: string, storeId: string) => {
  console.log('Fetching product details for item', itemId, 'from store', storeId);
  
  return new Promise(resolve => {
    setTimeout(() => {
      // This would be replaced with real product data from the store API
      resolve({
        itemId,
        storeId,
        storeProductId: `${storeId}-${itemId}-${Math.floor(Math.random() * 1000000)}`,
        brandName: generateBrandForItem(itemId, storeId),
        size: generateSizeForItem(itemId),
        nutritionInfo: {
          calories: Math.floor(hashStringToFloat(`calories-${itemId}`) * 500),
          protein: Math.floor(hashStringToFloat(`protein-${itemId}`) * 20),
          carbs: Math.floor(hashStringToFloat(`carbs-${itemId}`) * 30),
          fat: Math.floor(hashStringToFloat(`fat-${itemId}`) * 15)
        },
        imageUrl: `https://placehold.co/200x200/png?text=${encodeURIComponent(itemId)}`
      });
    }, 350);
  });
};

// Helper function to generate a consistent hash-based float between 0-1
function hashStringToFloat(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  // Convert to a number between 0-1
  return (hash & 0x7FFFFFFF) / 0x7FFFFFFF;
}

// Generate consistent brand names based on item and store
function generateBrandForItem(itemId: string, storeId: string): string {
  const storeBrands: Record<string, string[]> = {
    'aldi': ['Farmdale', 'Belmont', 'Baker\'s Life', 'Specially Selected'],
    'woolworths': ['Woolworths', 'Macro', 'Essentials', 'Gold'],
    'coles': ['Coles', 'Coles Finest', 'Coles Nature\'s Kitchen', 'I\'m Free From'],
    'iga': ['Black & Gold', 'IGA Signature', 'Community Co', 'IGA Baker\'s Oven']
  };
  
  const defaultBrands = ['Generic', 'Natural', 'Premium', 'Value'];
  const brands = storeBrands[storeId] || defaultBrands;
  
  const index = Math.floor(hashStringToFloat(`brand-${itemId}-${storeId}`) * brands.length);
  return brands[index];
}

// Generate consistent size information based on item
function generateSizeForItem(itemId: string): string {
  const units = ['g', 'kg', 'ml', 'L', 'pkg'];
  const unitIndex = Math.floor(hashStringToFloat(`unit-${itemId}`) * units.length);
  const unit = units[unitIndex];
  
  let amount: number;
  switch (unit) {
    case 'g':
      amount = Math.round(hashStringToFloat(`amount-${itemId}`) * 1000);
      break;
    case 'kg':
      amount = parseFloat((hashStringToFloat(`amount-${itemId}`) * 5).toFixed(1));
      break;
    case 'ml':
      amount = Math.round(hashStringToFloat(`amount-${itemId}`) * 2000);
      break;
    case 'L':
      amount = parseFloat((hashStringToFloat(`amount-${itemId}`) * 3).toFixed(1));
      break;
    case 'pkg':
      amount = Math.round(hashStringToFloat(`amount-${itemId}`) * 24);
      break;
    default:
      amount = 1;
  }
  
  return `${amount}${unit}`;
}
