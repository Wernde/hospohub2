
export const convertUnits = (amount: number, fromUnit: string, toUnit: string): number => {
  // Basic unit conversion logic
  const conversions: Record<string, Record<string, number>> = {
    'kg': { 'g': 1000, 'kg': 1 },
    'g': { 'kg': 0.001, 'g': 1 },
    'L': { 'ml': 1000, 'L': 1 },
    'ml': { 'L': 0.001, 'ml': 1 }
  };

  if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
    return amount * conversions[fromUnit][toUnit];
  }

  return amount; // No conversion available
};
