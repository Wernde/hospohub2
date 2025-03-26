
import React from 'react';
import RecipeNeedsList from './RecipeNeedsList';
import ShoppingList from './ShoppingList';
import { Card, CardContent } from '@/components/ui/card';

interface RecipeNeedsPanelProps {
  showShoppingList?: boolean;
}

const RecipeNeedsPanel = ({ showShoppingList = true }: RecipeNeedsPanelProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <RecipeNeedsList />
        </CardContent>
      </Card>
      
      {showShoppingList && (
        <Card>
          <CardContent className="pt-6">
            <ShoppingList />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecipeNeedsPanel;
