
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, InfoIcon } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface FeatureItem {
  name: string;
  available: boolean;
  comingSoonInfo?: string;
}

const RecipeFeaturesList = () => {
  const features: FeatureItem[] = [
    { name: 'Create new recipes', available: true },
    { name: 'Edit existing recipes', available: true },
    { name: 'Upload recipe images', available: true },
    { name: 'AI-powered extraction from documents', available: true },
    { name: 'Filter and search recipes', available: true },
    { 
      name: 'Calculate ingredient quantities based on student numbers', 
      available: false,
      comingSoonInfo: 'Coming in Summer 2025 - Scale recipes automatically based on class size.' 
    },
    { 
      name: 'Convert between recipe units and store units', 
      available: false,
      comingSoonInfo: 'Coming in Fall 2025 - Automatic conversion between different measurement systems.' 
    },
    { 
      name: 'Upload recipe attachments', 
      available: false,
      comingSoonInfo: 'Coming in Spring 2025 - Support for PDFs, videos, and other supplementary materials.' 
    },
    { 
      name: 'Send recipes for approval workflow', 
      available: false,
      comingSoonInfo: 'Coming in Summer 2025 - Full approval workflow for institutional settings.' 
    },
    { 
      name: 'Track recipe creator/teacher attribution', 
      available: false,
      comingSoonInfo: 'Coming in Spring 2025 - Credit original creators and track modifications.' 
    },
    { 
      name: 'Flag dietary restrictions and allergens', 
      available: false,
      comingSoonInfo: 'Coming in Spring 2025 - Comprehensive allergen tracking and warnings.' 
    },
    { 
      name: 'Suggest ingredient substitutions', 
      available: false,
      comingSoonInfo: 'Coming in Fall 2025 - AI-powered substitution recommendations.' 
    },
    { 
      name: 'Share recipes between teachers', 
      available: false,
      comingSoonInfo: 'Coming in Summer 2025 - Collaboration features for educational settings.' 
    },
    { 
      name: 'Ingredient cost analysis', 
      available: false,
      comingSoonInfo: 'Coming in Fall 2025 - Calculate recipe costs and budget planning tools.' 
    },
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
            
            {feature.available ? (
              <Badge 
                variant="success"
                className="bg-green-100 text-green-800 ml-auto"
              >
                Available
              </Badge>
            ) : (
              <div className="flex items-center ml-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-1 rounded-full hover:bg-amber-200/50 mr-1">
                        <InfoIcon className="h-3.5 w-3.5 text-amber-600" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs bg-amber-50 border-amber-200 text-amber-900">
                      <p>{feature.comingSoonInfo}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Badge 
                  variant="outline"
                  className="bg-amber-100 text-amber-800"
                >
                  Coming Soon
                </Badge>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFeaturesList;
