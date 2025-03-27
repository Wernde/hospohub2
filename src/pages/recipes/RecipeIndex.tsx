
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Plus } from 'lucide-react';
import RecipeFeaturesListContainer from '@/components/recipes/features/RecipeFeaturesListContainer';

const RecipeIndex = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-blue-900">Recipe Collection</h1>
            </div>
            
            <Button asChild>
              <Link to="/recipes/new" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add New Recipe</span>
              </Link>
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>My Recipes</CardTitle>
              <CardDescription>Browse and manage your recipe collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 mx-auto text-blue-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Recipes Added Yet</h3>
                <p className="text-gray-500 mb-4">Start building your recipe collection</p>
                <Button asChild>
                  <Link to="/recipes/new">Add Recipe</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <RecipeFeaturesListContainer />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipeIndex;
