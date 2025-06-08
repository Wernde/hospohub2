
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const IngredientCalculator = () => {
  const [originalServings, setOriginalServings] = useState(1);
  const [targetServings, setTargetServings] = useState(1);
  const [ingredients, setIngredients] = useState([
    { name: '', quantity: '', unit: 'g' }
  ]);
  const [calculatedIngredients, setCalculatedIngredients] = useState<any[]>([]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: 'g' }]);
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const calculateIngredients = () => {
    const ratio = targetServings / originalServings;
    const calculated = ingredients.map(ing => {
      const quantity = ing.quantity ? parseFloat(ing.quantity) * ratio : 0;
      return {
        ...ing,
        calculatedQuantity: quantity.toFixed(2)
      };
    });
    setCalculatedIngredients(calculated);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Calculator className="h-8 w-8 text-rgba(0, 0, 0, 0.12)-600 mr-3" />
            <h1 className="text-2xl font-bold text-rgba(0, 0, 0, 0.12)-900">Ingredient Calculator</h1>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Scale Recipe Ingredients</CardTitle>
              <CardDescription>Automatically adjust ingredient quantities for different serving sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="originalServings">Original Servings</Label>
                  <Input 
                    id="originalServings" 
                    type="number" 
                    min="1"
                    value={originalServings}
                    onChange={(e) => setOriginalServings(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="targetServings">Target Servings</Label>
                  <Input 
                    id="targetServings" 
                    type="number"
                    min="1"
                    value={targetServings}
                    onChange={(e) => setTargetServings(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Ingredients</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addIngredient}
                  >
                    Add Ingredient
                  </Button>
                </div>
                
                {ingredients.map((ing, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-5">
                      <Input 
                        placeholder="Ingredient name"
                        value={ing.name}
                        onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input 
                        type="number"
                        placeholder="Quantity"
                        value={ing.quantity}
                        onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                      />
                    </div>
                    <div className="col-span-4">
                      <Select 
                        value={ing.unit}
                        onValueChange={(value) => updateIngredient(index, 'unit', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="g">grams (g)</SelectItem>
                          <SelectItem value="kg">kilograms (kg)</SelectItem>
                          <SelectItem value="ml">milliliters (ml)</SelectItem>
                          <SelectItem value="L">liters (L)</SelectItem>
                          <SelectItem value="tsp">teaspoons (tsp)</SelectItem>
                          <SelectItem value="tbsp">tablespoons (tbsp)</SelectItem>
                          <SelectItem value="cup">cups</SelectItem>
                          <SelectItem value="pcs">pieces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={calculateIngredients}
                className="w-full"
              >
                Calculate
              </Button>
              
              {calculatedIngredients.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-medium mb-2">Calculated Ingredients</h3>
                  <div className="bg-rgba(0, 0, 0, 0.12)-50 p-4 rounded-md">
                    {calculatedIngredients.map((ing, index) => (
                      <div key={index} className="mb-2 last:mb-0">
                        {ing.name}: <span className="font-semibold">{ing.calculatedQuantity} {ing.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IngredientCalculator;
