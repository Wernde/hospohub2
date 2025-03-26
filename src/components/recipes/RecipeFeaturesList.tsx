
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Clock } from 'lucide-react';

interface FeatureItem {
  name: string;
  available: boolean;
}

const RecipeFeaturesList = () => {
  const features: FeatureItem[] = [
    { name: 'Create new recipes', available: true },
    { name: 'Edit existing recipes', available: true },
    { name: 'Upload recipe images', available: true },
    { name: 'AI-powered extraction from documents', available: true },
    { name: 'Filter and search recipes', available: true },
    { name: 'Calculate ingredient quantities based on student numbers', available: false },
    { name: 'Convert between recipe units and store units', available: false },
    { name: 'Upload recipe attachments', available: false },
    { name: 'Send recipes for approval workflow', available: false },
    { name: 'Track recipe creator/teacher attribution', available: false },
    { name: 'Flag dietary restrictions and allergens', available: false },
    { name: 'Suggest ingredient substitutions', available: false },
    { name: 'Share recipes between teachers', available: false },
    { name: 'Ingredient cost analysis', available: false },
  ];

  return (
    <div className="bg-blue-50 rounded-lg p-6 my-8">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Recipe Management Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-2 p-2 rounded-md ${
              feature.available ? 'bg-blue-100' : 'bg-gray-100'
            }`}
          >
            {feature.available ? (
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
            )}
            <span className="text-sm">{feature.name}</span>
            <Badge 
              variant={feature.available ? "success" : "outline"}
              className={feature.available ? 
                "bg-green-100 text-green-800 ml-auto" : 
                "bg-amber-100 text-amber-800 ml-auto"}
            >
              {feature.available ? "Available" : "Coming Soon"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFeaturesList;
