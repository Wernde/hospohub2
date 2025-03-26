
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const commonAllergens = [
  { id: 'dairy', name: 'Dairy', icon: '🥛', description: 'Includes milk, cheese, butter, and other dairy products' },
  { id: 'eggs', name: 'Eggs', icon: '🥚', description: 'Chicken eggs and egg derivatives' },
  { id: 'nuts', name: 'Tree Nuts', icon: '🥜', description: 'Almonds, walnuts, cashews, and other tree nuts' },
  { id: 'peanuts', name: 'Peanuts', icon: '🥜', description: 'Peanuts and peanut derivatives' },
  { id: 'fish', name: 'Fish', icon: '🐟', description: 'All types of fish' },
  { id: 'shellfish', name: 'Shellfish', icon: '🦐', description: 'Shrimp, crab, lobster, and other shellfish' },
  { id: 'soy', name: 'Soy', icon: '🫘', description: 'Soybeans and soy derivatives' },
  { id: 'wheat', name: 'Wheat', icon: '🌾', description: 'Wheat and wheat derivatives (contains gluten)' },
  { id: 'gluten', name: 'Gluten', icon: '🍞', description: 'Found in wheat, barley, rye, and some oats' },
];

const dietaryTypes = [
  { id: 'vegetarian', name: 'Vegetarian', description: 'No meat, may include eggs and dairy' },
  { id: 'vegan', name: 'Vegan', description: 'No animal products at all' },
  { id: 'pescatarian', name: 'Pescatarian', description: 'No meat except fish and seafood' },
  { id: 'halal', name: 'Halal', description: 'Follows Islamic dietary laws' },
  { id: 'kosher', name: 'Kosher', description: 'Follows Jewish dietary laws' },
  { id: 'keto', name: 'Keto', description: 'Low carb, high fat' },
  { id: 'paleo', name: 'Paleo', description: 'Based on foods presumed to be available to paleolithic humans' },
];

const DietaryRestrictionsTracker = () => {
  const [allergens, setAllergens] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  
  const toggleAllergen = (id: string) => {
    setAllergens(prev => 
      prev.includes(id) 
        ? prev.filter(a => a !== id) 
        : [...prev, id]
    );
  };
  
  const toggleDiet = (id: string) => {
    setDiets(prev => 
      prev.includes(id) 
        ? prev.filter(d => d !== id) 
        : [...prev, id]
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Dietary Restrictions & Allergens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Allergens Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Allergens</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {commonAllergens.map((allergen) => (
                <div key={allergen.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`allergen-${allergen.id}`} 
                    checked={allergens.includes(allergen.id)}
                    onCheckedChange={() => toggleAllergen(allergen.id)}
                  />
                  <Label 
                    htmlFor={`allergen-${allergen.id}`}
                    className="flex items-center cursor-pointer"
                  >
                    <span className="mr-1">{allergen.icon}</span>
                    {allergen.name}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-blue-500 ml-1.5 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{allergen.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dietary Types Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Dietary Types</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryTypes.map((diet) => (
                <div key={diet.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`diet-${diet.id}`}
                    checked={diets.includes(diet.id)}
                    onCheckedChange={() => toggleDiet(diet.id)}
                  />
                  <Label 
                    htmlFor={`diet-${diet.id}`}
                    className="flex items-center cursor-pointer"
                  >
                    {diet.name}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-blue-500 ml-1.5 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{diet.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recipe Tags Display */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Recipe Classification</h3>
            <div className="flex flex-wrap gap-2">
              {allergens.length > 0 && (
                <div>
                  <span className="text-xs text-red-600 mr-1">Contains:</span>
                  {allergens.map(id => {
                    const allergen = commonAllergens.find(a => a.id === id);
                    return allergen && (
                      <Badge key={id} variant="destructive" className="mr-1 mb-1">
                        {allergen.icon} {allergen.name}
                      </Badge>
                    );
                  })}
                </div>
              )}
              
              {diets.length > 0 && (
                <div className="ml-auto">
                  <span className="text-xs text-green-600 mr-1">Suitable for:</span>
                  {diets.map(id => {
                    const diet = dietaryTypes.find(d => d.id === id);
                    return diet && (
                      <Badge key={id} variant="success" className="mr-1 mb-1">
                        {diet.name}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DietaryRestrictionsTracker;
