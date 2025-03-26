
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Egg, SearchIcon } from 'lucide-react';

// This would ideally be powered by an API or database
const commonSubstitutions: Record<string, string[]> = {
  "butter": ["margarine", "coconut oil", "olive oil", "applesauce"],
  "milk": ["almond milk", "soy milk", "oat milk", "coconut milk"],
  "eggs": ["applesauce", "mashed banana", "flaxseed + water", "silken tofu"],
  "sugar": ["honey", "maple syrup", "agave nectar", "stevia"],
  "flour": ["almond flour", "coconut flour", "rice flour", "gluten-free flour blend"],
  "cream": ["coconut cream", "cashew cream", "silken tofu blend"],
  "cheese": ["nutritional yeast", "vegan cheese", "tofu"],
  "sour cream": ["greek yogurt", "coconut yogurt", "silken tofu blend"],
  "mayonnaise": ["avocado", "hummus", "greek yogurt"],
  "beef": ["beyond meat", "impossible meat", "portobello mushrooms", "lentils"],
  "chicken": ["tofu", "seitan", "jackfruit", "chickpeas"],
};

// Reasons for substitution
const substitutionReasons = [
  { value: "allergies", label: "Allergies" },
  { value: "dietary", label: "Dietary Preferences" },
  { value: "availability", label: "Ingredient Availability" },
  { value: "cost", label: "Cost Savings" },
  { value: "nutrition", label: "Nutritional Goals" },
];

const IngredientSubstitutionTool = () => {
  const [ingredient, setIngredient] = useState('');
  const [reason, setReason] = useState('allergies');
  const [substitutes, setSubstitutes] = useState<string[]>([]);
  const [customRecommendation, setCustomRecommendation] = useState('');
  
  const handleSearch = () => {
    const searchTerm = ingredient.toLowerCase().trim();
    
    // Find exact match
    if (commonSubstitutions[searchTerm]) {
      setSubstitutes(commonSubstitutions[searchTerm]);
      return;
    }
    
    // Find partial matches
    for (const [key, value] of Object.entries(commonSubstitutions)) {
      if (searchTerm.includes(key) || key.includes(searchTerm)) {
        setSubstitutes(value);
        return;
      }
    }
    
    // No matches found
    setSubstitutes([]);
    setCustomRecommendation("No substitutions found for this ingredient. Please try a different search term or add a custom recommendation.");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Egg className="h-5 w-5 text-green-500" />
          Ingredient Substitution Helper
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ingredient">Ingredient to Replace</Label>
              <Input 
                id="ingredient"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                placeholder="e.g. butter, eggs, milk"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Substitution</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {substitutionReasons.map((reason) => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full">
                <SearchIcon className="h-4 w-4 mr-2" />
                Find Substitutes
              </Button>
            </div>
          </div>
          
          {/* Results Section */}
          {substitutes.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Substitutes for {ingredient}
              </h3>
              <ul className="space-y-2">
                {substitutes.map((substitute, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    {substitute}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-3 border-t border-green-200">
                <p className="text-sm text-green-700">
                  <strong>Note:</strong> Substitution may affect texture, flavor, or cooking time. 
                  Adjust quantities as needed.
                </p>
              </div>
            </div>
          )}
          
          {substitutes.length === 0 && customRecommendation && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-amber-800">{customRecommendation}</p>
            </div>
          )}
          
          {/* Custom Recommendation */}
          <div className="mt-6 space-y-2">
            <Label htmlFor="customRecommendation">Add Custom Recommendation</Label>
            <Textarea 
              id="customRecommendation"
              value={customRecommendation}
              onChange={(e) => setCustomRecommendation(e.target.value)}
              placeholder="Add your own substitution recommendations here..."
              rows={2}
            />
            <p className="text-xs text-gray-500">
              Help improve our substitution database by adding your own recommendations.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IngredientSubstitutionTool;
