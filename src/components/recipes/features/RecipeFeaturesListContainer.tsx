import React from 'react';
import { 
  Check, Clock, InfoIcon, DollarSign, Users, 
  Utensils, Flag, Egg, ArrowUp, ArrowDown, ExternalLink 
} from 'lucide-react';
import { FeatureItem } from './types';
import FeaturesList from './FeaturesList';
import FeatureDetail from './FeatureDetail';
import NextUpcomingFeature from './NextUpcomingFeature';
import FeatureHeaderActions from './FeatureHeaderActions';
import { useFeatures } from './useFeatures';

const RecipeFeaturesListContainer: React.FC = () => {
  const initialFeatures: FeatureItem[] = [
    { 
      name: 'Create new recipes', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/new'
    },
    { 
      name: 'Edit existing recipes', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />
    },
    { 
      name: 'Upload recipe images', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/new'
    },
    { 
      name: 'AI-powered extraction from documents', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/new'
    },
    { 
      name: 'Filter and search recipes', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />
    },
    { 
      name: 'Calculate ingredient quantities based on student numbers', 
      available: true,
      icon: <Users className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/tools'
    },
    { 
      name: 'Convert between recipe units and store units', 
      available: true,
      icon: <ArrowDown className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/tools'
    },
    { 
      name: 'Upload recipe attachments', 
      available: true,
      icon: <Utensils className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/new'
    },
    { 
      name: 'Send recipes for approval workflow', 
      available: false,
      comingSoonInfo: 'Coming in Summer 2025 - Full approval workflow for institutional settings.',
      icon: <Utensils className="h-5 w-5 text-amber-500 flex-shrink-0" />
    },
    { 
      name: 'Track recipe creator/teacher attribution', 
      available: true,
      icon: <Users className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/tools'
    },
    { 
      name: 'Flag dietary restrictions and allergens', 
      available: true,
      icon: <Flag className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/tools'
    },
    { 
      name: 'Suggest ingredient substitutions', 
      available: true,
      icon: <Egg className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/tools'
    },
    { 
      name: 'Share recipes between teachers', 
      available: true,
      icon: <Users className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/tools'
    },
    { 
      name: 'Ingredient cost analysis', 
      available: true,
      icon: <DollarSign className="h-5 w-5 text-green-500 flex-shrink-0" />,
      link: '/recipes/tools'
    },
  ];

  const { 
    features, 
    selectedFeature, 
    upcomingFeatures, 
    nextUpcomingFeature, 
    handleFeatureClick,
    clearSelectedFeature
  } = useFeatures(initialFeatures);

  return (
    <div className="bg-blue-50 rounded-lg p-6 my-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-900">Recipe Management Features</h2>
        <FeatureHeaderActions upcomingFeatures={upcomingFeatures} />
      </div>
      
      <NextUpcomingFeature nextFeature={nextUpcomingFeature} />
      
      <FeaturesList 
        features={features} 
        onFeatureClick={handleFeatureClick}
        selectedFeature={selectedFeature}
      />
      
      <FeatureDetail 
        feature={selectedFeature} 
        onDismiss={clearSelectedFeature} 
      />
    </div>
  );
};

export default RecipeFeaturesListContainer;
