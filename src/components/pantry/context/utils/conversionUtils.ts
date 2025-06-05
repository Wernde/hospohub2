
// Convert quantities between units
export const convertQuantity = (
  quantity: number, 
  fromUnit: string, 
  toUnit: string
): number => {
  if (fromUnit === toUnit) return quantity;
  
  // Handle common conversions
  if (fromUnit === 'g' && toUnit === 'kg') return quantity / 1000;
  if (fromUnit === 'kg' && toUnit === 'g') return quantity * 1000;
  if (fromUnit === 'ml' && toUnit === 'L') return quantity / 1000;
  if (fromUnit === 'L' && toUnit === 'ml') return quantity * 1000;
  
  // Default case - no conversion possible
  return quantity;
};
