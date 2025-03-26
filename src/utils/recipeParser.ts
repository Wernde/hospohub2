
import { RecipeFormData } from '@/components/recipes/RecipeFormHandler';

// Mock function to simulate recipe parsing
export const simulateRecipeParsing = async (file: File): Promise<{
  success: boolean;
  message: string;
  data?: RecipeFormData;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate successful parsing
  if (file.name.endsWith('.txt') || file.name.endsWith('.docx') || file.name.endsWith('.pdf')) {
    return {
      success: true,
      message: "Successfully extracted recipe information from the file.",
      data: {
        title: "Chocolate Chip Cookies",
        description: "Classic homemade chocolate chip cookies that are soft in the middle and crispy on the edges.",
        prepTime: "15",
        cookTime: "10",
        servings: "24",
        difficulty: "easy",
        ingredients: "2 1/4 cups all-purpose flour\n1 tsp baking soda\n1 tsp salt\n1 cup unsalted butter, softened\n3/4 cup granulated sugar\n3/4 cup packed brown sugar\n2 large eggs\n2 tsp vanilla extract\n2 cups chocolate chips",
        instructions: "1. Preheat oven to 375°F (190°C).\n2. Combine flour, baking soda, and salt in a small bowl.\n3. Beat butter, granulated sugar, and brown sugar in a large mixer bowl.\n4. Add eggs one at a time, beating well after each addition. Stir in vanilla extract.\n5. Gradually beat in flour mixture. Stir in chocolate chips.\n6. Drop by rounded tablespoon onto ungreased baking sheets.\n7. Bake for 9 to 11 minutes or until golden brown.\n8. Let stand for 2 minutes; remove to wire racks to cool completely."
      }
    };
  } else {
    return {
      success: false,
      message: "Unable to parse the file format. Please try a different file."
    };
  }
};
