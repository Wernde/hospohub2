
// Re-export all the needed functions from the more focused files
export { 
  aggregateShoppingItems,
  groupItemsByRecipe,
  groupItemsByCategory
} from '../hooks/utils/shoppingListGrouping';

export {
  calculateTotalCost,
  createExportText
} from '../hooks/utils/shoppingListCalcs';
