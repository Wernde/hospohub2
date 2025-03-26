
import { useState } from 'react';
import { FeatureItem } from './types';

export const useFeatures = (initialFeatures: FeatureItem[]) => {
  const [features] = useState<FeatureItem[]>(initialFeatures);
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const upcomingFeatures = features.filter(feature => !feature.available);
  
  const nextUpcomingFeature = upcomingFeatures.length > 0 
    ? upcomingFeatures.reduce((earliest, feature) => {
        const earliestDate = earliest.comingSoonInfo?.split(' - ')[0].split('in ')[1] || '';
        const currentDate = feature.comingSoonInfo?.split(' - ')[0].split('in ')[1] || '';
        
        // Simple string comparison works for season + year format
        return currentDate < earliestDate ? feature : earliest;
      }, upcomingFeatures[0]) 
    : null;

  const handleFeatureClick = (feature: FeatureItem) => {
    setSelectedFeature(
      selectedFeature?.name === feature.name ? null : feature
    );
  };

  return {
    features,
    selectedFeature,
    upcomingFeatures,
    nextUpcomingFeature,
    handleFeatureClick,
    clearSelectedFeature: () => setSelectedFeature(null)
  };
};
