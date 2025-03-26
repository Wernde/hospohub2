
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface RecipeBasicInfoProps {
  title: string;
  description: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const RecipeBasicInfo = ({ title, description, onChange }: RecipeBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Recipe Title</Label>
        <Input 
          id="title"
          name="title"
          placeholder="E.g., Chocolate Souffle"
          value={title}
          onChange={onChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          name="description"
          placeholder="Brief description of the recipe"
          value={description}
          onChange={onChange}
          rows={3}
        />
      </div>
    </div>
  );
};

export default RecipeBasicInfo;
