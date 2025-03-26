
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, PlusCircle, Trash2, BarChart3 } from 'lucide-react';
import { parseIngredient } from '@/utils/recipeUnitConversion';

interface IngredientCost {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  unitCost: string;
  totalCost: number;
}

const IngredientCostAnalysis = () => {
  const [ingredients, setIngredients] = useState<IngredientCost[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [unitCostInput, setUnitCostInput] = useState('');
  const [markupPercentage, setMarkupPercentage] = useState('30');
  const [laborCost, setLaborCost] = useState('0');
  
  const handleAddIngredient = () => {
    if (!ingredientInput.trim() || !unitCostInput.trim()) return;
    
    const parsedIngredient = parseIngredient(ingredientInput);
    
    // Create a new ingredient with default values if parsing fails
    const newIngredient: IngredientCost = {
      id: Date.now().toString(),
      name: parsedIngredient.ingredient || ingredientInput,
      quantity: parsedIngredient.quantity?.toString() || '1',
      unit: parsedIngredient.unit || 'each',
      unitCost: unitCostInput,
      totalCost: calculateTotalCost(parsedIngredient.quantity || 1, parseFloat(unitCostInput))
    };
    
    setIngredients([...ingredients, newIngredient]);
    setIngredientInput('');
    setUnitCostInput('');
  };
  
  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };
  
  const calculateTotalCost = (quantity: number, unitCost: number) => {
    return quantity * unitCost;
  };
  
  const getTotalIngredientCost = () => {
    return ingredients.reduce((total, ingredient) => total + ingredient.totalCost, 0);
  };
  
  const getTotalRecipeCost = () => {
    const ingredientTotal = getTotalIngredientCost();
    const laborTotal = parseFloat(laborCost) || 0;
    return ingredientTotal + laborTotal;
  };
  
  const getMarkupCost = () => {
    const total = getTotalRecipeCost();
    const markup = parseFloat(markupPercentage) / 100;
    return total * markup;
  };
  
  const getSuggestedPrice = () => {
    return getTotalRecipeCost() + getMarkupCost();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          Ingredient Cost Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add Ingredient Form */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-end">
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="ingredient">Ingredient (with quantity)</Label>
              <Input 
                id="ingredient"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                placeholder="e.g. 2 cups flour"
              />
            </div>
            
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="unitCost">Cost Per Unit ($)</Label>
              <Input 
                id="unitCost"
                value={unitCostInput}
                onChange={(e) => setUnitCostInput(e.target.value)}
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 2.50"
              />
            </div>
            
            <div className="md:col-span-1">
              <Button onClick={handleAddIngredient} className="w-full h-full" variant="outline">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Ingredients Table */}
          {ingredients.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingredient</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Unit Cost</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredients.map((ingredient) => (
                    <TableRow key={ingredient.id}>
                      <TableCell>{ingredient.name}</TableCell>
                      <TableCell>{ingredient.quantity}</TableCell>
                      <TableCell>{ingredient.unit}</TableCell>
                      <TableCell>${ingredient.unitCost}</TableCell>
                      <TableCell>${ingredient.totalCost.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveIngredient(ingredient.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Additional Costs & Markup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="laborCost">Labor Cost ($)</Label>
              <Input 
                id="laborCost"
                value={laborCost}
                onChange={(e) => setLaborCost(e.target.value)}
                type="number"
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="markupPercentage">Markup Percentage (%)</Label>
              <Input 
                id="markupPercentage"
                value={markupPercentage}
                onChange={(e) => setMarkupPercentage(e.target.value)}
                type="number"
                step="1"
                min="0"
              />
            </div>
          </div>
          
          {/* Cost Summary */}
          {ingredients.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2 mb-3">
                <BarChart3 className="h-5 w-5" />
                Cost Summary
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between border-b border-green-200 pb-2">
                  <span>Total Ingredient Cost:</span>
                  <span className="font-medium">${getTotalIngredientCost().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between border-b border-green-200 pb-2">
                  <span>Labor Cost:</span>
                  <span className="font-medium">${parseFloat(laborCost || '0').toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between border-b border-green-200 pb-2">
                  <span>Recipe Base Cost:</span>
                  <span className="font-medium">${getTotalRecipeCost().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between border-b border-green-200 pb-2">
                  <span>Markup ({markupPercentage}%):</span>
                  <span className="font-medium">${getMarkupCost().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between pt-2 text-lg text-green-800 font-bold">
                  <span>Suggested Price:</span>
                  <span>${getSuggestedPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IngredientCostAnalysis;
