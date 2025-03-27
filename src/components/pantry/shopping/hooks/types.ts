
export type ViewMode = 'list' | 'byRecipe' | 'byCategory' | 'byStore';

export interface Store {
  id: string;
  name: string;
  color?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  recipes: string[];
  classNames: string[];
  prices?: Record<string, number>;
  category?: string;
}
