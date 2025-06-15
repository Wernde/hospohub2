
import React, { Suspense, lazy } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';
import { exportRecipes } from '@/utils/excelExport';
import ExportButton from '@/components/ui/export-button';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load the features component
const RecipeFeaturesListContainer = lazy(() => import('@/components/recipes/features/RecipeFeaturesListContainer'));

const RecipeIndex = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock recipes for export functionality
  const mockRecipes = [
    {
      id: '1',
      name: 'Classic Chocolate Cake',
      difficulty: 'Medium',
      prepTime: 30,
      cookTime: 45,
      servings: 12,
      ingredients: '2 cups flour, 2 cups sugar, 3/4 cup cocoa powder, 2 tsp baking soda, 1 tsp salt, 2 eggs, 1 cup buttermilk, 1/2 cup vegetable oil, 2 tsp vanilla extract, 1 cup hot coffee',
      instructions: '1. Preheat oven to 350°F. 2. Mix dry ingredients. 3. Add wet ingredients and mix well. 4. Pour into pans and bake for 35 minutes.'
    },
    {
      id: '2',
      name: 'Vegetable Stir Fry',
      difficulty: 'Easy',
      prepTime: 15,
      cookTime: 10,
      servings: 4,
      ingredients: '2 tbsp oil, 1 onion, 2 carrots, 1 bell pepper, 2 cups broccoli, 3 cloves garlic, 2 tbsp soy sauce, 1 tbsp rice vinegar',
      instructions: '1. Heat oil in a wok. 2. Add vegetables and stir fry for 5-7 minutes. 3. Add sauce and cook for another 2 minutes.'
    }
  ];
  
  const handleExportRecipes = () => {
    exportRecipes(mockRecipes, 'my-recipes');
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-stone-600 mr-3" />
              <h1 className="text-2xl font-bold text-stone-900">Recipe Collection</h1>
            </div>
            
            <div className="flex gap-2">
              <ExportButton 
                onExport={handleExportRecipes} 
                label="Export"
                variant="outline"
              />
              <Button onClick={() => navigate('/recipes/new')} className="bg-stone-600 hover:bg-stone-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Recipe
              </Button>
            </div>
          </div>
          
          <Card className="mb-8 bg-stone-50 border-stone-200">
            <CardHeader>
              <CardTitle className="text-stone-900">My Recipes</CardTitle>
              <CardDescription className="text-stone-600">Browse and manage your recipe collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 mx-auto text-stone-400 mb-4" />
                <h3 className="text-lg font-medium mb-2 text-stone-900">No Recipes Added Yet</h3>
                <p className="text-stone-500 mb-4">Start building your recipe collection</p>
                <Button onClick={() => navigate('/recipes/new')} className="bg-stone-600 hover:bg-stone-700">
                  Add Recipe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RecipeIndex;
