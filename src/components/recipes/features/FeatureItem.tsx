
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { InfoIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip';
import { FeatureItemProps } from './types';
import FeatureIcon from './FeatureIcon';

const FeatureItem: React.FC<FeatureItemProps> = ({
  feature,
  onClick,
  isSelected
}) => {
  return (
    <div 
      className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
        feature.available ? 'bg-blue-100' : 'bg-gray-100 hover:bg-amber-50 cursor-pointer'
      }`}
      onClick={() => !feature.available && onClick(feature)}
    >
      {feature.icon || <FeatureIcon iconName={feature.iconName} iconColor={feature.iconColor} />}
      <span className="text-sm">{feature.name}</span>
      
      {feature.available ? (
        feature.link ? (
          <div className="ml-auto">
            <Badge 
              variant="success"
              className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors cursor-pointer"
            >
              <Link to={feature.link} className="flex items-center gap-1">
                Available
                <ExternalLink className="h-3 w-3 ml-0.5" />
              </Link>
            </Badge>
          </div>
        ) : (
          <Badge 
            variant="success"
            className="bg-green-100 text-green-800 ml-auto"
          >
            Available
          </Badge>
        )
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
  );
};

export default FeatureItem;
