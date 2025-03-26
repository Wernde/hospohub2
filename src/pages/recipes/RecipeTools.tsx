
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecipePageHeader from '@/components/recipes/RecipePageHeader';
import UnitConversionTool from '@/components/recipes/UnitConversionTool';
import IngredientScalingTool from '@/components/recipes/IngredientScalingTool';
import RecipeAttributionManager from '@/components/recipes/RecipeAttributionManager';
import DietaryRestrictionsTracker from '@/components/recipes/DietaryRestrictionsTracker';
import IngredientSubstitutionTool from '@/components/recipes/IngredientSubstitutionTool';
import RecipeSharingTool from '@/components/recipes/RecipeSharingTool';
import IngredientCostAnalysis from '@/components/recipes/IngredientCostAnalysis';

const RecipeTools = () => {
  const [activeTab, setActiveTab] = useState('unit-conversion');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <RecipePageHeader title="Recipe Tools" />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full mb-6">
              <TabsTrigger value="unit-conversion">Units</TabsTrigger>
              <TabsTrigger value="ingredient-scaling">Scaling</TabsTrigger>
              <TabsTrigger value="attribution">Attribution</TabsTrigger>
              <TabsTrigger value="dietary">Dietary</TabsTrigger>
              <TabsTrigger value="substitution">Substitutes</TabsTrigger>
              <TabsTrigger value="sharing">Sharing</TabsTrigger>
              <TabsTrigger value="cost">Costs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="unit-conversion">
              <UnitConversionTool />
            </TabsContent>
            
            <TabsContent value="ingredient-scaling">
              <IngredientScalingTool />
            </TabsContent>
            
            <TabsContent value="attribution">
              <RecipeAttributionManager />
            </TabsContent>
            
            <TabsContent value="dietary">
              <DietaryRestrictionsTracker />
            </TabsContent>
            
            <TabsContent value="substitution">
              <IngredientSubstitutionTool />
            </TabsContent>
            
            <TabsContent value="sharing">
              <RecipeSharingTool />
            </TabsContent>
            
            <TabsContent value="cost">
              <IngredientCostAnalysis />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipeTools;
