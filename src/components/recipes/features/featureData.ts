
import { FeatureItem } from './types';

// Use string identifiers for icons instead of JSX
export const recipeFeatures: FeatureItem[] = [
  { 
    name: 'Create new recipes', 
    available: true,
    iconName: 'Utensils',
    iconColor: 'green',
    link: '/recipes/new'
  },
  { 
    name: 'Edit existing recipes', 
    available: true,
    iconName: 'Utensils',
    iconColor: 'green'
  },
  { 
    name: 'Upload recipe images', 
    available: true,
    iconName: 'Utensils',
    iconColor: 'green',
    link: '/recipes/new'
  },
  { 
    name: 'AI-powered extraction from documents', 
    available: true,
    iconName: 'Utensils',
    iconColor: 'green',
    link: '/recipes/new'
  },
  { 
    name: 'Filter and search recipes', 
    available: true,
    iconName: 'Utensils',
    iconColor: 'green'
  },
  { 
    name: 'Calculate ingredient quantities based on student numbers', 
    available: true,
    iconName: 'Users',
    iconColor: 'green',
    link: '/recipes/tools'
  },
  { 
    name: 'Convert between recipe units and store units', 
    available: true,
    iconName: 'ArrowDown',
    iconColor: 'green',
    link: '/recipes/tools'
  },
  { 
    name: 'Upload recipe attachments', 
    available: true,
    iconName: 'Utensils',
    iconColor: 'green',
    link: '/recipes/new'
  },
  { 
    name: 'Send recipes for approval workflow', 
    available: false,
    comingSoonInfo: 'Coming in Summer 2025 - Full approval workflow for institutional settings.',
    iconName: 'Utensils',
    iconColor: 'amber'
  },
  { 
    name: 'Track recipe creator/teacher attribution', 
    available: true,
    iconName: 'Users',
    iconColor: 'green',
    link: '/recipes/tools'
  },
  { 
    name: 'Flag dietary restrictions and allergens', 
    available: true,
    iconName: 'Flag',
    iconColor: 'green',
    link: '/recipes/tools'
  },
  { 
    name: 'Suggest ingredient substitutions', 
    available: true,
    iconName: 'Egg',
    iconColor: 'green',
    link: '/recipes/tools'
  },
  { 
    name: 'Share recipes between teachers', 
    available: true,
    iconName: 'Users',
    iconColor: 'green',
    link: '/recipes/tools'
  },
  { 
    name: 'Ingredient cost analysis', 
    available: true,
    iconName: 'DollarSign',
    iconColor: 'green',
    link: '/recipes/tools'
  },
];
