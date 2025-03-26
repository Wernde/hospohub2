
type UnitType = 'weight' | 'volume' | 'count';

interface UnitConversion {
  type: UnitType;
  baseUnit: string;
  conversionFactor: number;
}

// Conversion factors relative to base units (g for weight, ml for volume)
export const unitConversions: Record<string, UnitConversion> = {
  // Weight units
  'g': { type: 'weight', baseUnit: 'g', conversionFactor: 1 },
  'kg': { type: 'weight', baseUnit: 'g', conversionFactor: 1000 },
  'oz': { type: 'weight', baseUnit: 'g', conversionFactor: 28.35 },
  'lb': { type: 'weight', baseUnit: 'g', conversionFactor: 453.59 },
  
  // Volume units
  'ml': { type: 'volume', baseUnit: 'ml', conversionFactor: 1 },
  'l': { type: 'volume', baseUnit: 'ml', conversionFactor: 1000 },
  'tsp': { type: 'volume', baseUnit: 'ml', conversionFactor: 4.93 },
  'tbsp': { type: 'volume', baseUnit: 'ml', conversionFactor: 14.79 },
  'cup': { type: 'volume', baseUnit: 'ml', conversionFactor: 236.59 },
  'fl oz': { type: 'volume', baseUnit: 'ml', conversionFactor: 29.57 },
  'pint': { type: 'volume', baseUnit: 'ml', conversionFactor: 473.18 },
  'quart': { type: 'volume', baseUnit: 'ml', conversionFactor: 946.35 },
  'gallon': { type: 'volume', baseUnit: 'ml', conversionFactor: 3785.41 },
  
  // Count units (these don't convert between units, but are used for scaling)
  'each': { type: 'count', baseUnit: 'each', conversionFactor: 1 },
  'piece': { type: 'count', baseUnit: 'each', conversionFactor: 1 },
  'slice': { type: 'count', baseUnit: 'each', conversionFactor: 1 },
};

/**
 * Convert quantity from one unit to another
 */
export const convertUnit = (
  quantity: number, 
  fromUnit: string, 
  toUnit: string
): number | null => {
  // Normalize units to lowercase for comparison
  const from = fromUnit.toLowerCase();
  const to = toUnit.toLowerCase();
  
  // If units are the same, no conversion needed
  if (from === to) return quantity;
  
  // Check if we have conversion factors for both units
  if (!unitConversions[from] || !unitConversions[to]) {
    console.error(`Unknown unit: ${!unitConversions[from] ? from : to}`);
    return null;
  }
  
  // Check if units are of the same type
  if (unitConversions[from].type !== unitConversions[to].type) {
    console.error(`Cannot convert between different types: ${from} (${unitConversions[from].type}) and ${to} (${unitConversions[to].type})`);
    return null;
  }
  
  // Convert to base unit first, then to target unit
  const valueInBaseUnit = quantity * unitConversions[from].conversionFactor;
  return valueInBaseUnit / unitConversions[to].conversionFactor;
};

/**
 * Scale ingredients based on number of servings
 */
export const scaleIngredientQuantity = (
  originalQuantity: number,
  originalServings: number,
  targetServings: number
): number => {
  return (originalQuantity / originalServings) * targetServings;
};

/**
 * Parse ingredient string to extract quantity and unit
 */
export const parseIngredient = (ingredientText: string): { 
  quantity: number | null;
  unit: string | null;
  ingredient: string;
} => {
  // Basic regex to match patterns like "2 cups flour" or "1.5 kg potatoes"
  const regex = /^([\d./]+)\s+([a-zA-Z]+\.?|[a-zA-Z]+\s+[a-zA-Z]+)\s+(.+)$/;
  const match = ingredientText.match(regex);
  
  if (match) {
    // Convert fraction strings like "1/2" to numbers
    let quantity: number | null = null;
    if (match[1].includes('/')) {
      const [numerator, denominator] = match[1].split('/');
      quantity = parseFloat(numerator) / parseFloat(denominator);
    } else {
      quantity = parseFloat(match[1]);
    }
    
    return {
      quantity,
      unit: match[2].trim().toLowerCase(),
      ingredient: match[3].trim()
    };
  }
  
  return {
    quantity: null,
    unit: null,
    ingredient: ingredientText.trim()
  };
};
