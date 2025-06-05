
export const toggleExpandedState = (currentState: Record<string, boolean>, key: string): Record<string, boolean> => {
  return {
    ...currentState,
    [key]: !currentState[key]
  };
};
