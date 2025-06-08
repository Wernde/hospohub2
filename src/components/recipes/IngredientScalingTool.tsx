
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { parseIngredient, scaleIngredientQuantity } from '@/utils/recipeUnitConversion';

const IngredientScalingTool = () => {
  const [originalServings, setOriginalServings] = useState<string>('');
  const [targetServings, setTargetServings] = useState<string>('');
  const [ingredientsList, setIngredientsList] = useState<string>('');
  const [scaledIngredients, setScaledIngredients] = useState<string>('');
  
  const handleScale = () => {
    const origServings = parseInt(originalServings);
    const targServings = parseInt(targetServings);
    
    if (isNaN(origServings) || isNaN(targServings) || origServings <= 0 || targServings <= 0) {
      return;
    }
    
    const ingredients = ingredientsList.split('\n').filter(line => line.trim() !== '');
    const scaled = ingredients.map(line => {
      const { quantity, unit, ingredient } = parseIngredient(line);
      
      if (quantity === null) {
        return line; // Cannot parse, return as is
      }
      
      const scaledQuantity = scaleIngredientQuantity(
        quantity,
        origServings,
        targServings
      );
      
      // Format the result nicely
      return `${scaledQuantity.toFixed(2)} ${unit || ''} ${ingredient}`.trim();
    });
    
    setScaledIngredients(scaled.join('\n'));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scale Ingredients for Class Size</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalServings">Original Recipe Servings</Label>
              <Input 
                id="originalServings"
                value={originalServings}
                onChange={(e) => setOriginalServings(e.target.value)}
                type="number"
                min="1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetServings">Target Number of Students</Label>
              <Input 
                id="targetServings"
                value={targetServings}
                onChange={(e) => setTargetServings(e.target.value)}
                type="number"
                min="1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ingredientsList">Original Ingredients (one per line)</Label>
            <Textarea 
              id="ingredientsList"
              value={ingredientsList}
              onChange={(e) => setIngredientsList(e.target.value)}
              placeholder="2 cups flour
1 tsp salt
3 eggs"
              rows={5}
            />
          </div>
          
          <Button onClick={handleScale} className="w-full">Scale for Class Size</Button>
          
          {scaledIngredients && (
            <div className="space-y-2 mt-4">
              <Label htmlFor="scaledIngredients">Scaled Ingredients</Label>
              <Textarea 
                id="scaledIngredients"
                value={scaledIngredients}
                readOnly
                rows={5}
                className="bg-rgba(0, 0, 0, 0.12)-50"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IngredientScalingTool;
