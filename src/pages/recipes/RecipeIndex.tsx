
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, ChefHat, Clock, Users, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample data for recipes
const sampleRecipes = [
  {
    id: 1,
    title: 'Chocolate Soufflé',
    description: 'A light and airy dessert that is sure to impress your guests.',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    image: 'https://placehold.co/300x200/blue/FFF?text=Soufflé'
  },
  {
    id: 2,
    title: 'Mediterranean Salad',
    description: 'Fresh and healthy salad with chickpeas, feta, and olive oil dressing.',
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    image: 'https://placehold.co/300x200/green/FFF?text=Salad'
  },
  {
    id: 3,
    title: 'Beef Wellington',
    description: 'A classic dish of beef tenderloin wrapped in puff pastry.',
    prepTime: 45,
    cookTime: 40,
    servings: 6,
    difficulty: 'Hard',
    image: 'https://placehold.co/300x200/red/FFF?text=Wellington'
  }
];

const RecipeIndex = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState(sampleRecipes);
  
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-semibold text-blue-900">Recipes</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search recipes..."
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button asChild>
                <Link to="/recipes/new" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Recipe
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden flex flex-col">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="flex-grow p-5">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">{recipe.title}</h3>
                  <p className="text-sm text-blue-600 mb-4">{recipe.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-blue-500">
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>Prep: {recipe.prepTime} min</span>
                    </div>
                    <div className="flex items-center">
                      <ChefHat className="h-3.5 w-3.5 mr-1" />
                      <span>Cook: {recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>Serves: {recipe.servings}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-blue-50 px-5 py-3">
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-blue-300 mb-4" />
              <h3 className="text-lg font-medium text-blue-900 mb-2">No recipes found</h3>
              <p className="text-blue-600 mb-6">
                {searchTerm ? 
                  `No recipes match "${searchTerm}". Try a different search term.` : 
                  "You haven't added any recipes yet. Get started by adding your first recipe!"}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link to="/recipes/new" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Your First Recipe
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipeIndex;
