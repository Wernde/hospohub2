
import React from 'react';
import { Clock } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { FeatureItem } from './types';

interface UpcomingFeaturesBadgeProps {
  upcomingFeatures: FeatureItem[];
}

const UpcomingFeaturesBadge: React.FC<UpcomingFeaturesBadgeProps> = ({ upcomingFeatures }) => {
  if (upcomingFeatures.length === 0) return null;
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button 
          className="text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors px-3 py-1.5 rounded-full flex items-center gap-1.5"
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
  );
};

export default UpcomingFeaturesBadge;
