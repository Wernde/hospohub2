
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Plus, Trash2 } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
}

const IngredientCalculator = () => {
  const [servings, setServings] = useState<number>(4);
  const [targetServings, setTargetServings] = useState<number>(8);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Flour', quantity: 2, unit: 'cups', costPerUnit: 0.50 },
    { id: '2', name: 'Sugar', quantity: 1, unit: 'cup', costPerUnit: 0.75 },
  ]);

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: '',
      quantity: 0,
      unit: 'cups',
      costPerUnit: 0
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const scalingFactor = targetServings / servings;
  const totalCost = ingredients.reduce((sum, ing) => 
    sum + (ing.quantity * scalingFactor * ing.costPerUnit), 0
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Calculator className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Ingredient Calculator</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recipe Scaling</CardTitle>
                <CardDescription>Adjust ingredient quantities based on serving size</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-servings">Current Servings</Label>
                    <Input
                      id="current-servings"
                      type="number"
                      value={servings}
                      onChange={(e) => setServings(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-servings">Target Servings</Label>
                    <Input
                      id="target-servings"
                      type="number"
                      value={targetServings}
                      onChange={(e) => setTargetServings(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Ingredients</h3>
                    <Button onClick={addIngredient} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  
                  {ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-4">
                        <Label className="text-xs">Name</Label>
                        <Input
                          value={ingredient.name}
                          onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                          placeholder="Ingredient"
                          size="sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs">Qty</Label>
                        <Input
                          type="number"
                          value={ingredient.quantity}
                          onChange={(e) => updateIngredient(ingredient.id, 'quantity', Number(e.target.value))}
                          step="0.1"
                          size="sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs">Unit</Label>
                        <Select value={ingredient.unit} onValueChange={(value) => updateIngredient(ingredient.id, 'unit', value)}>
                          <SelectTrigger size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cups">cups</SelectItem>
                            <SelectItem value="tbsp">tbsp</SelectItem>
                            <SelectItem value="tsp">tsp</SelectItem>
                            <SelectItem value="oz">oz</SelectItem>
                            <SelectItem value="lbs">lbs</SelectItem>
                            <SelectItem value="g">g</SelectItem>
                            <SelectItem value="kg">kg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs">Cost/$</Label>
                        <Input
                          type="number"
                          value={ingredient.costPerUnit}
                          onChange={(e) => updateIngredient(ingredient.id, 'costPerUnit', Number(e.target.value))}
                          step="0.01"
                          size="sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <Button
                          onClick={() => removeIngredient(ingredient.id)}
                          size="sm"
                          variant="outline"
                          className="w-full"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Scaled Recipe</CardTitle>
                <CardDescription>Adjusted quantities for {targetServings} servings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{ingredient.name || 'Unnamed ingredient'}</div>
                        <div className="text-sm text-gray-600">
                          {(ingredient.quantity * scalingFactor).toFixed(2)} {ingredient.unit}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">
                          ${(ingredient.quantity * scalingFactor * ingredient.costPerUnit).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${ingredient.costPerUnit.toFixed(2)}/{ingredient.unit}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>Total Recipe Cost:</span>
                      <span className="text-green-600">${totalCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                      <span>Cost per serving:</span>
                      <span>${(totalCost / targetServings).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IngredientCalculator;
