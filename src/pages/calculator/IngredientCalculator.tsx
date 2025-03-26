
import React, { useState } from 'react';
import { Plus, Minus, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecipePageHeader from '@/components/recipes/RecipePageHeader';

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

const IngredientCalculator = () => {
  const [baseServings, setBaseServings] = useState<number>(4);
  const [targetServings, setTargetServings] = useState<number>(10);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Flour', amount: 2, unit: 'cups' },
    { id: '2', name: 'Sugar', amount: 1, unit: 'cup' },
    { id: '3', name: 'Butter', amount: 0.5, unit: 'cup' },
  ]);
  const { toast } = useToast();

  const addIngredient = () => {
    const newId = (ingredients.length + 1).toString();
    setIngredients([
      ...ingredients,
      { id: newId, name: '', amount: 0, unit: '' },
    ]);
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You need at least one ingredient",
        variant: "destructive",
      });
      return;
    }
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map(ingredient => {
      if (ingredient.id === id) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    }));
  };

  const calculateScaledAmount = (amount: number): number => {
    if (!baseServings || baseServings === 0) return 0;
    return +(amount * (targetServings / baseServings)).toFixed(2);
  };

  const handleBaseServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setBaseServings(value);
    } else {
      setBaseServings(1);
    }
  };

  const handleTargetServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setTargetServings(value);
    } else {
      setTargetServings(1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <RecipePageHeader 
            title="Ingredient Calculator" 
            description="Scale recipe ingredients for different class sizes"
          />

          <Card className="shadow-md mb-8">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b">
              <CardTitle className="text-xl text-yellow-800">Servings</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="baseServings">Original Recipe Serves</Label>
                  <Input 
                    id="baseServings" 
                    type="number" 
                    min="1"
                    value={baseServings} 
                    onChange={handleBaseServingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetServings">Target Class Size</Label>
                  <Input 
                    id="targetServings" 
                    type="number" 
                    min="1"
                    value={targetServings} 
                    onChange={handleTargetServingsChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md mb-8">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-yellow-800">Ingredients</CardTitle>
                <Button 
                  onClick={addIngredient} 
                  variant="outline" 
                  size="sm"
                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-300"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Ingredient
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-500 pb-2">
                  <div className="col-span-5">Ingredient</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-3">Unit</div>
                  <div className="col-span-2">Scaled Amount</div>
                </div>
                <Separator />
                
                {ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-5">
                      <Input
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={ingredient.amount}
                        onChange={(e) => updateIngredient(ingredient.id, 'amount', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Unit (e.g., cup)"
                        value={ingredient.unit}
                        onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                      />
                    </div>
                    <div className="col-span-1 font-medium text-yellow-800">
                      {calculateScaledAmount(ingredient.amount)}
                    </div>
                    <div className="col-span-1 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIngredient(ingredient.id)}
                      >
                        <Minus className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 rounded-md border border-yellow-100">
                <div className="flex items-start">
                  <Calculator className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Scaling Factor: {(targetServings / baseServings).toFixed(2)}x</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      All ingredient amounts have been scaled from {baseServings} to {targetServings} servings.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IngredientCalculator;
