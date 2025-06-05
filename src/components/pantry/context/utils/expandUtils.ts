
// Utility functions for toggling expanded states

// Toggle expanded state (for categories and recipes)
export const toggleExpandedState = (
  currentState: Record<string, boolean>, 
  key: string
): Record<string, boolean> => {
  return {
    ...currentState,
    [key]: !currentState[key]
  };
};
