
import React from 'react';
import { ChefHat, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Recipe type
interface Recipe {
  id: string;
  name: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
}

interface RecipeSelectionTabProps {
  selectedRecipes: Recipe[];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  mockRecipes: Recipe[];
  onNavigateBack: () => void;
  onNavigateNext: () => void;
}

const RecipeSelectionTab: React.FC<RecipeSelectionTabProps> = ({
  selectedRecipes,
  setSelectedRecipes,
  mockRecipes,
  onNavigateBack,
  onNavigateNext
}) => {
  const [recipeDialogOpen, setRecipeDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const handleAddRecipe = (recipe: Recipe) => {
    if (!selectedRecipes.some(r => r.id === recipe.id)) {
      setSelectedRecipes([...selectedRecipes, recipe]);
      toast({
        title: "Recipe added",
        description: `${recipe.name} has been added to the class`,
      });
    }
  };

  const handleRemoveRecipe = (recipeId: string) => {
    setSelectedRecipes(selectedRecipes.filter(recipe => recipe.id !== recipeId));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Selected Recipes</h3>
          <Dialog open={recipeDialogOpen} onOpenChange={setRecipeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                Add Recipe
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Select Recipes</DialogTitle>
                <DialogDescription>
                  Choose recipes to include in this class.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                {mockRecipes.map((recipe) => (
                  <div key={recipe.id} className="flex items-center justify-between p-3 bg-rgba(0, 0, 0, 0.12)-50 rounded-md">
                    <div>
                      <h4 className="font-medium">{recipe.name}</h4>
                      <p className="text-sm text-gray-500">
                        {recipe.difficulty} • {recipe.prepTime + recipe.cookTime} min • {recipe.servings} servings
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        handleAddRecipe(recipe);
                        setRecipeDialogOpen(false);
                      }}
                      disabled={selectedRecipes.some(r => r.id === recipe.id)}
                    >
                      {selectedRecipes.some(r => r.id === recipe.id) ? 'Added' : 'Add'}
                    </Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {selectedRecipes.length > 0 ? (
          <div className="space-y-4 mt-4">
            {selectedRecipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
              >
                <div>
                  <h4 className="font-medium">{recipe.name}</h4>
                  <p className="text-sm text-gray-500">
                    {recipe.difficulty} • {recipe.prepTime + recipe.cookTime} min • {recipe.servings} servings
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      Options
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleRemoveRecipe(recipe.id)}
                    >
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border rounded-lg bg-gray-50 mt-4">
            <ChefHat className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No recipes selected</h3>
            <p className="text-gray-500 mb-4">Add recipes to teach in this class</p>
            <Button
              onClick={() => setRecipeDialogOpen(true)}
              variant="outline"
            >
              Add Recipe
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onNavigateBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Details
        </Button>
        
        <Button
          type="button"
          onClick={onNavigateNext}
        >
          Next: Add Students
        </Button>
      </div>
    </div>
  );
};

export default RecipeSelectionTab;
