import { PantryItem } from '../types';

// Additional pantry items (to keep file sizes manageable)
export const additionalPantryData: PantryItem[] = [
  {
    id: "p006",
    ingredientName: "Salt",
    category: "Spices & Seasonings",
    currentQuantity: 0.3,
    unit: "kg",
    location: "Shelf B2",
    expirationDate: "2026-12-31",
    lastUpdated: "2025-02-28",
    lowStockThreshold: 0.2,
    isLowStock: false,
    recipeUnit: "g",
    conversionFactor: 1000
  },
  {
    id: "p007",
    ingredientName: "Black Pepper",
    category: "Spices & Seasonings",
    currentQuantity: 0.1,
    unit: "kg",
    location: "Shelf B2",
    expirationDate: "2025-12-15",
    lastUpdated: "2025-03-01",
    lowStockThreshold: 0.1,
    isLowStock: true,
    recipeUnit: "g",
    conversionFactor: 1000
  },
  {
    id: "p008",
    ingredientName: "Chicken Breast",
    category: "Proteins",
    currentQuantity: 2.5,
    unit: "kg",
    location: "Freezer 2",
    expirationDate: "2025-04-30",
    lastUpdated: "2025-03-15",
    lowStockThreshold: 3,
    isLowStock: true,
    recipeUnit: "g",
    conversionFactor: 1000
  },
  {
    id: "p009",
    ingredientName: "Broccoli",
    category: "Vegetables",
    currentQuantity: 1.2,
    unit: "kg",
    location: "Refrigerator 2",
    expirationDate: "2025-03-25",
    lastUpdated: "2025-03-20",
    lowStockThreshold: 1,
    isLowStock: false,
    recipeUnit: "g",
    conversionFactor: 1000
  }
];
