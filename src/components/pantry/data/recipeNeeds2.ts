import { RecipeNeed } from '../types';

// Additional recipe needs data (to keep file sizes manageable)
export const additionalRecipeNeeds: RecipeNeed[] = [
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
