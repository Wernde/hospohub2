
import { ReactNode } from 'react';
import { 
  Utensils, Users, Flag, Egg, 
  DollarSign, ArrowDown
} from 'lucide-react';
import { FeatureItem } from './types';

export const recipeFeatures: FeatureItem[] = [
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
