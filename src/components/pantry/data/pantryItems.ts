
import { PantryItem } from '../types';

// Mock data for pantry items
export const initialPantryData: PantryItem[] = [
  {
    id: "p001",
    ingredientName: "Flour",
    category: "Dry Goods",
    currentQuantity: 5.2,
    unit: "kg",
    location: "Shelf A1",
    expirationDate: "2025-09-15",
    lastUpdated: "2025-03-15",
    lowStockThreshold: 2,
    isLowStock: false,
    recipeUnit: "g",
    conversionFactor: 1000
  },
  {
    id: "p002",
    ingredientName: "Sugar",
    category: "Dry Goods",
    currentQuantity: 3.8,
    unit: "kg",
    location: "Shelf A2",
    expirationDate: "2026-01-10",
    lastUpdated: "2025-03-10",
    lowStockThreshold: 1.5,
    isLowStock: false,
    recipeUnit: "g",
    conversionFactor: 1000
  },
  {
    id: "p003",
    ingredientName: "Olive Oil",
    category: "Oils & Vinegars",
    currentQuantity: 0.8,
    unit: "L",
    location: "Cabinet B1",
    expirationDate: "2025-07-22",
    lastUpdated: "2025-03-05",
    lowStockThreshold: 1,
    isLowStock: true,
    recipeUnit: "ml",
    conversionFactor: 1000
  },
  {
    id: "p004",
    ingredientName: "Eggs",
    category: "Dairy & Eggs",
    currentQuantity: 18,
    unit: "each",
    location: "Refrigerator 1",
    expirationDate: "2025-04-01",
    lastUpdated: "2025-03-18",
    lowStockThreshold: 12,
    isLowStock: false,
    recipeUnit: "each",
    conversionFactor: 1
  },
  {
    id: "p005",
    ingredientName: "Butter",
    category: "Dairy & Eggs",
    currentQuantity: 1.2,
    unit: "kg",
    location: "Refrigerator 1",
    expirationDate: "2025-05-10",
    lastUpdated: "2025-03-10",
    lowStockThreshold: 0.5,
    isLowStock: false,
    recipeUnit: "g",
    conversionFactor: 1000
  }
];
