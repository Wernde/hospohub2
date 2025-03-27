
import { Store } from '../types';

// Sample store data with colors for visual differentiation
export const getStores = (): Store[] => [
  { id: 'aldi', name: 'Aldi', color: '#9b87f5' },   // Purple
  { id: 'woolworths', name: 'Woolworths', color: '#ea384c' },  // Red
  { id: 'coles', name: 'Coles', color: '#0EA5E9' },  // Teal
  { id: 'iga', name: 'IGA', color: '#EAB308' }  // Gold
];
