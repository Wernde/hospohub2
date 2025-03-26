
// Helper functions for the AI chat component

// Search the web for information
export const searchWeb = async (query: string): Promise<string> => {
  // Simulate web search with delay
  // In a real implementation, this would be an actual API call to a search service
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock responses based on keywords
      if (query.toLowerCase().includes('recipe') || query.toLowerCase().includes('cook')) {
        return resolve("I found several relevant cooking resources on the web. The latest cooking trends include fermentation, plant-based alternatives, and sustainable cooking practices. Would you like me to explain any of these in more detail?");
      } else if (query.toLowerCase().includes('ingredient') || query.toLowerCase().includes('substitute')) {
        return resolve("According to culinary sources, you can substitute eggs in baking with applesauce (¼ cup per egg), mashed banana (¼ cup per egg), or ground flaxseed mixed with water (1 tbsp flax + 3 tbsp water per egg).");
      } else {
        return resolve("I've searched for information about your query but couldn't find specific details. Could you ask me something more specific about cooking, recipes, or kitchen management?");
      }
    }, 2000);
  });
};

// Generate response for recipe-related queries
export const generateRecipeResponse = (query: string): string => {
  if (query.toLowerCase().includes('chocolate') || query.toLowerCase().includes('dessert')) {
    return "For chocolate desserts, I recommend trying a Flourless Chocolate Cake. It's simple to make with just chocolate, butter, eggs, sugar, and a touch of espresso to enhance the flavor. Would you like me to provide the full recipe?";
  } else if (query.toLowerCase().includes('vegetarian') || query.toLowerCase().includes('vegan')) {
    return "For plant-based dishes, Mushroom Risotto is a crowd-pleaser. The key is using vegetable broth and slowly adding it while stirring. Would you like more vegetarian recipe suggestions?";
  } else if (query.toLowerCase().includes('quick') || query.toLowerCase().includes('fast')) {
    return "For a quick meal, try a Mediterranean Chickpea Salad. It combines chickpeas, cucumber, tomatoes, feta, and a lemon-olive oil dressing. It's ready in 10 minutes and nutritious!";
  }
  return "I'd be happy to suggest recipes. Could you tell me what ingredients you have on hand or any dietary preferences?";
};

// Define contextual responses
export interface ContextualResponse {
  context: string;
  responses: string[];
}

export const contextualResponses: Record<string, ContextualResponse> = {
  '/dashboard': {
    context: 'dashboard',
    responses: [
      "I see you're on the dashboard. I can help you manage your recipes, classes, or inventory.",
      "Need help organizing your kitchen inventory? I can recommend recipes based on what you have.",
      "Would you like me to help you plan your upcoming classes or check inventory levels?"
    ]
  },
  '/recipes': {
    context: 'recipes',
    responses: [
      "Looking for recipe inspiration? I can suggest seasonal recipes or help with ingredient substitutions.",
      "I can help you scale a recipe up or down for different class sizes.",
      "Would you like me to search for recipes based on specific ingredients or dietary restrictions?"
    ]
  },
  '/classes': {
    context: 'classes',
    responses: [
      "Need help organizing your cooking classes? I can suggest optimal class sizes or equipment setups.",
      "I can help you pair recipes to create complete class menus.",
      "Would you like suggestions for adjusting recipes to different skill levels?"
    ]
  },
  '/pantry': {
    context: 'pantry',
    responses: [
      "I can help you track inventory or suggest recipes based on what's in your pantry.",
      "Looking to optimize your pantry organization? I have some tips for storage and rotation.",
      "Would you like suggestions for ingredients you could add to your pantry?"
    ]
  }
};

// Get context-aware response based on current location
export const getContextAwareResponse = (pathname: string): string => {
  const contextResponse = contextualResponses[pathname];
  if (contextResponse) {
    const randomIndex = Math.floor(Math.random() * contextResponse.responses.length);
    return contextResponse.responses[randomIndex];
  }
  return "How can I help you with your culinary needs today?";
};
