
import React from 'react';
import FeaturesList from './FeaturesList';
import FeatureDetail from './FeatureDetail';
import NextUpcomingFeature from './NextUpcomingFeature';
import FeatureHeaderActions from './FeatureHeaderActions';
import { useFeatures } from './useFeatures';
import { recipeFeatures } from './featureData';

const RecipeFeaturesListContainer: React.FC = () => {
  const { 
    features, 
    selectedFeature, 
    upcomingFeatures, 
    nextUpcomingFeature, 
    handleFeatureClick,
    clearSelectedFeature
  } = useFeatures(recipeFeatures);

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
