
import React from 'react';
import { Clock } from 'lucide-react';
import { FeatureItem } from './types';

interface NextUpcomingFeatureProps {
  nextFeature: FeatureItem | null;
}

const NextUpcomingFeature: React.FC<NextUpcomingFeatureProps> = ({ nextFeature }) => {
  if (!nextFeature) return null;
  
  return (
    <div className="mb-4 bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
      <div className="font-medium text-amber-800 flex items-center gap-2">
        <Clock className="h-4 w-4 text-amber-600" />
        Coming soon: {nextFeature.name}
      </div>
      <p className="mt-1 text-amber-700 text-xs ml-6">
        {nextFeature.comingSoonInfo}
      </p>
    </div>
  );
};

export default NextUpcomingFeature;
