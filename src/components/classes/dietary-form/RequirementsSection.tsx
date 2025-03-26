
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X } from 'lucide-react';
import { RequirementsSectionProps } from './types';

const RequirementsSection: React.FC<RequirementsSectionProps> = ({
  formData,
  setFormData,
  customValue,
  setCustomValue,
  addCustomItem,
  removeItem,
  itemType,
  commonItems,
  itemLabel,
  itemColor
}) => {
  const handleToggle = (item: string) => {
    setFormData(prev => {
      const current = [...prev[itemType]];
      if (current.includes(item)) {
        return { ...prev, [itemType]: current.filter(i => i !== item) };
      } else {
        return { ...prev, [itemType]: [...current, item] };
      }
    });
  };

  return (
    <div className="space-y-2">
      <Label>{itemLabel}</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-1">
        {commonItems.map(item => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox 
              id={`${itemType}-${item}`}
              checked={formData[itemType].includes(item)}
              onCheckedChange={() => handleToggle(item)}
            />
            <Label 
              htmlFor={`${itemType}-${item}`}
              className="text-sm cursor-pointer"
            >
              {item}
            </Label>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {formData[itemType]
          .filter(item => !commonItems.includes(item))
          .map(item => (
            <div key={item} className={`flex items-center ${itemColor} rounded px-2 py-1 text-sm`}>
              {item}
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 ml-1" 
                onClick={() => removeItem(item)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
      </div>
      
      <div className="flex gap-2 mt-2">
        <Input
          placeholder={`Add custom ${itemLabel.toLowerCase()}`}
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="button" 
          onClick={addCustomItem} 
          disabled={!customValue.trim()}
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
    </div>
  );
};

export default RequirementsSection;
