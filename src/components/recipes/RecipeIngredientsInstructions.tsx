
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface RecipeIngredientsInstructionsProps {
  ingredients: string;
  instructions: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RecipeIngredientsInstructions = ({ 
  ingredients, 
  instructions, 
  onChange 
}: RecipeIngredientsInstructionsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="ingredients">Ingredients</Label>
        <Textarea 
          id="ingredients"
          name="ingredients"
          placeholder="Enter each ingredient on a new line"
          value={ingredients}
          onChange={onChange}
          rows={5}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="instructions">Instructions</Label>
        <Textarea 
          id="instructions"
          name="instructions"
          placeholder="Enter step-by-step instructions"
          value={instructions}
          onChange={onChange}
          rows={8}
          required
        />
      </div>
    </>
  );
};

export default RecipeIngredientsInstructions;
