
import { RecipeNeed } from '../types';

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
  }
];
