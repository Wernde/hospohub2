
import React from 'react';
import { Clock } from 'lucide-react';
import { FeatureItem } from './types';

interface FeatureDetailProps {
  feature: FeatureItem | null;
  onDismiss: () => void;
}

const FeatureDetail: React.FC<FeatureDetailProps> = ({ feature, onDismiss }) => {
  if (!feature) return null;
  
  return (
    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <h3 className="font-medium text-amber-800">{feature.name}</h3>
      <p className="mt-1 text-amber-700 text-sm">
        {feature.comingSoonInfo}
      </p>
      <div className="flex mt-3 justify-end">
        <button 
          onClick={onDismiss}
          className="text-xs text-amber-700 hover:text-amber-900"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default FeatureDetail;
