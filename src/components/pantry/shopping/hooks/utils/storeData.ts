
import { Store } from '../types';

// Sample store data with colors for visual differentiation
export const getStores = (): Store[] => [
  { id: 'local-market', name: 'Local Market', color: '#4CAF50' },
  { id: 'fresh-foods', name: 'Fresh Foods', color: '#2196F3' },
  { id: 'super-store', name: 'Super Store', color: '#FF9800' },
  { id: 'bulk-buy', name: 'Bulk Buy', color: '#9C27B0' }
];
