
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, InfoIcon, Dollar, Users, Utensils, Flag, Egg, ArrowUp, ArrowDown } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';

interface FeatureItem {
  name: string;
  available: boolean;
  comingSoonInfo?: string;
  icon?: React.ReactNode;
}

const RecipeFeaturesList = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);
  
  const features: FeatureItem[] = [
    { 
      name: 'Create new recipes', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />
    },
    { 
      name: 'Edit existing recipes', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />
    },
    { 
      name: 'Upload recipe images', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />
    },
    { 
      name: 'AI-powered extraction from documents', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />
    },
    { 
      name: 'Filter and search recipes', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />
    },
    { 
      name: 'Calculate ingredient quantities based on student numbers', 
      available: false,
      comingSoonInfo: 'Coming in Summer 2025 - Scale recipes automatically based on class size.',
      icon: <Users className="h-5 w-5 text-amber-500 flex-shrink-0" />
    },
    { 
      name: 'Convert between recipe units and store units', 
      available: false,
      comingSoonInfo: 'Coming in Fall 2025 - Automatic conversion between different measurement systems.',
      icon: <ArrowDown className="h-5 w-5 text-amber-500 flex-shrink-0" />
    },
    { 
      name: 'Upload recipe attachments', 
      available: false,
      comingSoonInfo: 'Coming in Spring 2025 - Support for PDFs, videos, and other supplementary materials.',
      icon: <Utensils className="h-5 w-5 text-amber-500 flex-shrink-0" />
    },
    { 
      name: 'Send recipes for approval workflow', 
      available: false,
      comingSoonInfo: 'Coming in Summer 2025 - Full approval workflow for institutional settings.',
      icon: <Utensils className="h-5 w-5 text-amber-500 flex-shrink-0" />
    },
    { 
      name: 'Track recipe creator/teacher attribution', 
      available: false,
      comingSoonInfo: 'Coming in Spring 2025 - Credit original creators and track modifications.',
      icon: <Users className="h-5 w-5 text-amber-500 flex-shrink-0" />
    },
    { 
      name: 'Flag dietary restrictions and allergens', 
      available: false,
      comingSoonInfo: 'Coming in Spring 2025 - Comprehensive allergen tracking and warnings.',
      icon: <Flag className="h-5 w-5 text-amber-500 flex-shrink-0" />
    },
    { 
      name: 'Suggest ingredient substitutions', 
      available: false,
      comingSoonInfo: 'Coming in Fall 2025 - AI-powered substitution recommendations.',
      icon: <Egg className="h-5 w-5 text-amber-500 flex-shrink-0" />
    },
    { 
      name: 'Share recipes between teachers', 
      available: false,
      comingSoonInfo: 'Coming in Summer 2025 - Collaboration features for educational settings.',
      icon: <Users className="h-5 w-5 text-amber-500 flex-shrink-0" />
    },
    { 
      name: 'Ingredient cost analysis', 
      available: false,
      comingSoonInfo: 'Coming in Fall 2025 - Calculate recipe costs and budget planning tools.',
      icon: <Dollar className="h-5 w-5 text-amber-500 flex-shrink-0" />
    },
  ];

  const upcomingFeatures = features.filter(feature => !feature.available);
  const nextUpcomingFeature = upcomingFeatures.reduce((earliest, feature) => {
    const earliestDate = earliest.comingSoonInfo?.split(' - ')[0].split('in ')[1] || '';
    const currentDate = feature.comingSoonInfo?.split(' - ')[0].split('in ')[1] || '';
    
    // Simple string comparison works for season + year format
    return currentDate < earliestDate ? feature : earliest;
  }, upcomingFeatures[0]);

  return (
    <div className="bg-blue-50 rounded-lg p-6 my-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-900">Recipe Management Features</h2>
        
        <Popover>
          <PopoverTrigger asChild>
            <button 
              className="mt-2 md:mt-0 text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors px-3 py-1.5 rounded-full flex items-center gap-1.5"
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Coming Soon Features</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="bg-amber-50 p-3 border-b border-amber-100 rounded-t-md">
              <h3 className="text-sm font-medium text-amber-900">Upcoming Features</h3>
              <p className="text-xs text-amber-700 mt-1">
                Here's what we're working on next for HospoHub
              </p>
            </div>
            <div className="max-h-[300px] overflow-y-auto py-2">
              {upcomingFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="px-3 py-2 hover:bg-amber-50 border-b border-amber-100/50 last:border-0"
                >
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 text-amber-500 mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium">{feature.name}</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-1 ml-5.5">
                    {feature.comingSoonInfo}
                  </p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {nextUpcomingFeature && (
        <div className="mb-4 bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
          <div className="font-medium text-amber-800 flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-600" />
            Coming soon: {nextUpcomingFeature.name}
          </div>
          <p className="mt-1 text-amber-700 text-xs ml-6">
            {nextUpcomingFeature.comingSoonInfo}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
              feature.available ? 'bg-blue-100' : 'bg-gray-100 hover:bg-amber-50 cursor-pointer'
            }`}
            onClick={() => !feature.available && setSelectedFeature(
              selectedFeature?.name === feature.name ? null : feature
            )}
          >
            {feature.available ? (
              feature.icon || <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              feature.icon || <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
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
      
      {selectedFeature && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <h3 className="font-medium text-amber-800">{selectedFeature.name}</h3>
          <p className="mt-1 text-amber-700 text-sm">
            {selectedFeature.comingSoonInfo}
          </p>
          <div className="flex mt-3 justify-end">
            <button 
              onClick={() => setSelectedFeature(null)}
              className="text-xs text-amber-700 hover:text-amber-900"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFeaturesList;
