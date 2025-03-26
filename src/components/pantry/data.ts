
import { PantryItem, RecipeNeed } from './types';

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
  },
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

// Mock data for recipes needing ingredients
export const mockRecipeNeeds: RecipeNeed[] = [
  {
    recipeId: "r001",
    recipeTitle: "Vegetable Stir Fry",
    classId: "c10A",
    className: "10A",
    studentCount: 24,
    date: "2025-03-25",
    ingredients: [
      {
        id: "i001",
        name: "Broccoli",
        recipeQuantity: 125,
        recipeUnit: "g",
        totalQuantity: 3000, // 125g × 24 students
        storeQuantity: 3,
        storeUnit: "kg",
        pantryStatus: "check" // To be checked against pantry
      },
      {
        id: "i002",
        name: "Olive Oil",
        recipeQuantity: 15,
        recipeUnit: "ml",
        totalQuantity: 360, // 15ml × 24 students
        storeQuantity: 0.36,
        storeUnit: "L",
        pantryStatus: "check"
      }
    ]
  },
  {
    recipeId: "r002",
    recipeTitle: "Chocolate Chip Cookies",
    classId: "c11B",
    className: "11B",
    studentCount: 22,
    date: "2025-03-26",
    ingredients: [
      {
        id: "i003",
        name: "Flour",
        recipeQuantity: 200,
        recipeUnit: "g",
        totalQuantity: 4400, // 200g × 22 students
        storeQuantity: 4.4,
        storeUnit: "kg",
        pantryStatus: "check"
      },
      {
        id: "i004",
        name: "Sugar",
        recipeQuantity: 150,
        recipeUnit: "g",
        totalQuantity: 3300, // 150g × 22 students
        storeQuantity: 3.3,
        storeUnit: "kg",
        pantryStatus: "check"
      },
      {
        id: "i005",
        name: "Butter",
        recipeQuantity: 120,
        recipeUnit: "g",
        totalQuantity: 2640, // 120g × 22 students
        storeQuantity: 2.64,
        storeUnit: "kg",
        pantryStatus: "check"
      },
      {
        id: "i006",
        name: "Eggs",
        recipeQuantity: 1,
        recipeUnit: "each",
        totalQuantity: 22, // 1 egg × 22 students
        storeQuantity: 22,
        storeUnit: "each",
        pantryStatus: "check"
      }
    ]
  }
];
