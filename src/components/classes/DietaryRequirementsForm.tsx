
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X } from 'lucide-react';

interface StudentFormData {
  name: string;
  email: string;
  dietaryRequirements: string[];
  allergies: string[];
  notes?: string;
}

interface DietaryRequirementsFormProps {
  onSubmit: (data: StudentFormData) => void;
}

const commonDietaryRequirements = [
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Gluten-free',
  'Dairy-free',
  'Kosher',
  'Halal',
  'Keto',
  'Paleo',
  'Low sodium'
];

const commonAllergies = [
  'Dairy',
  'Eggs',
  'Nuts',
  'Peanuts',
  'Shellfish',
  'Wheat',
  'Soy',
  'Fish',
  'Sesame'
];

const DietaryRequirementsForm: React.FC<DietaryRequirementsFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    dietaryRequirements: [],
    allergies: [],
    notes: ''
  });
  
  const [customDietary, setCustomDietary] = useState('');
  const [customAllergy, setCustomAllergy] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDietaryToggle = (requirement: string) => {
    setFormData(prev => {
      const current = [...prev.dietaryRequirements];
      if (current.includes(requirement)) {
        return { ...prev, dietaryRequirements: current.filter(item => item !== requirement) };
      } else {
        return { ...prev, dietaryRequirements: [...current, requirement] };
      }
    });
  };

  const handleAllergyToggle = (allergy: string) => {
    setFormData(prev => {
      const current = [...prev.allergies];
      if (current.includes(allergy)) {
        return { ...prev, allergies: current.filter(item => item !== allergy) };
      } else {
        return { ...prev, allergies: [...current, allergy] };
      }
    });
  };

  const addCustomDietary = () => {
    if (customDietary.trim()) {
      setFormData(prev => ({
        ...prev,
        dietaryRequirements: [...prev.dietaryRequirements, customDietary.trim()]
      }));
      setCustomDietary('');
    }
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim()) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, customAllergy.trim()]
      }));
      setCustomAllergy('');
    }
  };

  const removeDietary = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryRequirements: prev.dietaryRequirements.filter(item => item !== requirement)
    }));
  };

  const removeAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(item => item !== allergy)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      dietaryRequirements: [],
      allergies: [],
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Student Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="Enter student name" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            placeholder="Enter student email" 
            required 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Dietary Requirements</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-1">
          {commonDietaryRequirements.map(item => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox 
                id={`dietary-${item}`}
                checked={formData.dietaryRequirements.includes(item)}
                onCheckedChange={() => handleDietaryToggle(item)}
              />
              <Label 
                htmlFor={`dietary-${item}`}
                className="text-sm cursor-pointer"
              >
                {item}
              </Label>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.dietaryRequirements
            .filter(req => !commonDietaryRequirements.includes(req))
            .map(req => (
              <div key={req} className="flex items-center bg-blue-100 text-blue-800 rounded px-2 py-1 text-sm">
                {req}
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1" 
                  onClick={() => removeDietary(req)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
        </div>
        
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Add custom dietary requirement"
            value={customDietary}
            onChange={(e) => setCustomDietary(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={addCustomDietary} 
            disabled={!customDietary.trim()}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Allergies</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-1">
          {commonAllergies.map(item => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox 
                id={`allergy-${item}`}
                checked={formData.allergies.includes(item)}
                onCheckedChange={() => handleAllergyToggle(item)}
              />
              <Label 
                htmlFor={`allergy-${item}`}
                className="text-sm cursor-pointer"
              >
                {item}
              </Label>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.allergies
            .filter(allergy => !commonAllergies.includes(allergy))
            .map(allergy => (
              <div key={allergy} className="flex items-center bg-red-100 text-red-800 rounded px-2 py-1 text-sm">
                {allergy}
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1" 
                  onClick={() => removeAllergy(allergy)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
        </div>
        
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Add custom allergy"
            value={customAllergy}
            onChange={(e) => setCustomAllergy(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={addCustomAllergy} 
            disabled={!customAllergy.trim()}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea 
          id="notes" 
          name="notes" 
          value={formData.notes} 
          onChange={handleInputChange} 
          placeholder="Enter any additional notes about the student"
          className="min-h-[80px]"
        />
      </div>
      
      <div className="pt-2">
        <Button type="submit">
          Add Student
        </Button>
      </div>
    </form>
  );
};

export default DietaryRequirementsForm;
