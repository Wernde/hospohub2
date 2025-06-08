
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Utensils } from 'lucide-react';
import UpcomingFeaturesBadge from './UpcomingFeaturesBadge';
import { FeatureItem } from './types';

interface FeatureHeaderActionsProps {
  upcomingFeatures: FeatureItem[];
}

const FeatureHeaderActions: React.FC<FeatureHeaderActionsProps> = ({ upcomingFeatures }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
      <Button asChild variant="outline" className="bg-rgba(0, 0, 0, 0.12)-100 text-rgba(0, 0, 0, 0.12)-800 hover:bg-rgba(0, 0, 0, 0.12)-200 transition-colors border-rgba(0, 0, 0, 0.12)-200">
        <Link to="/recipes/tools" className="flex items-center gap-1.5">
          <Utensils className="h-3.5 w-3.5" />
          <span>Recipe Tools</span>
        </Link>
      </Button>
      
      {upcomingFeatures.length > 0 && (
        <UpcomingFeaturesBadge upcomingFeatures={upcomingFeatures} />
      )}
    </div>
  );
};

export default FeatureHeaderActions;
