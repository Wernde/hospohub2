
import React from 'react';
import FeatureItem from './FeatureItem';
import { FeatureItem as FeatureItemType } from './types';

interface FeaturesListProps {
  features: FeatureItemType[];
  onFeatureClick: (feature: FeatureItemType) => void;
  selectedFeature: FeatureItemType | null;
}

const FeaturesList: React.FC<FeaturesListProps> = ({ 
  features, 
  onFeatureClick,
  selectedFeature
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {features.map((feature, index) => (
        <FeatureItem 
          key={index} 
          feature={feature} 
          onClick={onFeatureClick}
          isSelected={selectedFeature?.name === feature.name}
        />
      ))}
    </div>
  );
};

export default FeaturesList;
