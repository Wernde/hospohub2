
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';

interface RecipeFormActionsProps {
  isSubmitting: boolean;
}

const RecipeFormActions = ({ isSubmitting }: RecipeFormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Saving...
          </>
        ) : (
          <>
            <ChefHat className="h-4 w-4" />
            Add Recipe
          </>
        )}
      </Button>
    </div>
  );
};

export default RecipeFormActions;
