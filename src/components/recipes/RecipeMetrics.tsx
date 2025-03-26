
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, Users, Utensils } from 'lucide-react';

interface RecipeMetricsProps {
  prepTime: string;
  cookTime: string;
  servings: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RecipeMetrics = ({ prepTime, cookTime, servings, onChange }: RecipeMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="prepTime" className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          Prep Time (minutes)
        </Label>
        <Input 
          id="prepTime"
          name="prepTime"
          type="number"
          placeholder="15"
          value={prepTime}
          onChange={onChange}
        />
      </div>
      
      <div>
        <Label htmlFor="cookTime" className="flex items-center gap-1">
          <Utensils className="h-4 w-4" />
          Cook Time (minutes)
        </Label>
        <Input 
          id="cookTime"
          name="cookTime"
          type="number"
          placeholder="30"
          value={cookTime}
          onChange={onChange}
        />
      </div>
      
      <div>
        <Label htmlFor="servings" className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          Servings
        </Label>
        <Input 
          id="servings"
          name="servings"
          type="number"
          placeholder="4"
          value={servings}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default RecipeMetrics;
