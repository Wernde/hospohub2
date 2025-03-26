
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Clock, Users, Utensils, BookOpen, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageUpload from '@/components/recipes/ImageUpload';
import RecipeFileUpload from '@/components/recipes/RecipeFileUpload';
import RecipeParserDialog from '@/components/recipes/RecipeParserDialog';

// Mock function to simulate recipe parsing
const simulateRecipeParsing = async (file: File): Promise<{
  success: boolean;
  message: string;
  data?: {
    title: string;
    description: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    difficulty: 'easy' | 'medium' | 'hard';
    ingredients: string;
    instructions: string;
  }
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate successful parsing
  if (file.name.endsWith('.txt') || file.name.endsWith('.docx') || file.name.endsWith('.pdf')) {
    return {
      success: true,
      message: "Successfully extracted recipe information from the file.",
      data: {
        title: "Chocolate Chip Cookies",
        description: "Classic homemade chocolate chip cookies that are soft in the middle and crispy on the edges.",
        prepTime: "15",
        cookTime: "10",
        servings: "24",
        difficulty: "easy",
        ingredients: "2 1/4 cups all-purpose flour\n1 tsp baking soda\n1 tsp salt\n1 cup unsalted butter, softened\n3/4 cup granulated sugar\n3/4 cup packed brown sugar\n2 large eggs\n2 tsp vanilla extract\n2 cups chocolate chips",
        instructions: "1. Preheat oven to 375°F (190°C).\n2. Combine flour, baking soda, and salt in a small bowl.\n3. Beat butter, granulated sugar, and brown sugar in a large mixer bowl.\n4. Add eggs one at a time, beating well after each addition. Stir in vanilla extract.\n5. Gradually beat in flour mixture. Stir in chocolate chips.\n6. Drop by rounded tablespoon onto ungreased baking sheets.\n7. Bake for 9 to 11 minutes or until golden brown.\n8. Let stand for 2 minutes; remove to wire racks to cool completely."
      }
    };
  } else {
    return {
      success: false,
      message: "Unable to parse the file format. Please try a different file."
    };
  }
};

const NewRecipe = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'medium',
    ingredients: '',
    instructions: ''
  });
  
  // New state variables for file uploads and AI parsing
  const [recipeImage, setRecipeImage] = useState<File | null>(null);
  const [isParsingDialogOpen, setIsParsingDialogOpen] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseResult, setParseResult] = useState<null | {
    success: boolean;
    message: string;
    data?: typeof formData;
  }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate saving the recipe
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Recipe Created",
        description: `"${formData.title}" has been successfully added to your recipes.`,
      });
      
      // In a real app, we would save the recipe to a database here
      // If we had an image, we would upload it to storage
      navigate('/recipes');
    }, 1500);
  };
  
  const handleFileSelect = async (file: File) => {
    setIsParsingDialogOpen(true);
    setIsParsing(true);
    setParseResult(null);
    
    try {
      // In a real app, this would be an API call to a backend service
      const result = await simulateRecipeParsing(file);
      setParseResult(result);
    } catch (error) {
      setParseResult({
        success: false,
        message: "An error occurred while parsing the file."
      });
    } finally {
      setIsParsing(false);
    }
  };
  
  const applyParsedData = () => {
    if (parseResult?.success && parseResult.data) {
      setFormData(parseResult.data);
      setIsParsingDialogOpen(false);
      
      toast({
        title: "Recipe Data Applied",
        description: "The recipe information has been filled in from your file.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center mb-6">
            <BookOpen className="mr-3 h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-semibold text-blue-900">Add New Recipe</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
            </CardHeader>
            
            {/* Recipe File Upload for AI Parsing */}
            <CardContent>
              <RecipeFileUpload onFileSelect={handleFileSelect} />
            </CardContent>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Image Upload */}
                <ImageUpload 
                  onChange={setRecipeImage}
                  value={recipeImage}
                />
                
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Recipe Title</Label>
                    <Input 
                      id="title"
                      name="title"
                      placeholder="E.g., Chocolate Souffle"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      name="description"
                      placeholder="Brief description of the recipe"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                </div>
                
                {/* Recipe Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="prepTime" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Prep Time (minutes)
                    </Label>
                    <Input 
                      id="prepTime"
                      name="prepTime"
                      type="number"
                      placeholder="15"
                      value={formData.prepTime}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cookTime" className="flex items-center gap-1">
                      <Utensils className="h-4 w-4" />
                      Cook Time (minutes)
                    </Label>
                    <Input 
                      id="cookTime"
                      name="cookTime"
                      type="number"
                      placeholder="30"
                      value={formData.cookTime}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="servings" className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Servings
                    </Label>
                    <Input 
                      id="servings"
                      name="servings"
                      type="number"
                      placeholder="4"
                      value={formData.servings}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Difficulty Level */}
                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full h-10 px-3 bg-transparent border border-input rounded-md text-sm"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                
                {/* Ingredients */}
                <div>
                  <Label htmlFor="ingredients">Ingredients</Label>
                  <Textarea 
                    id="ingredients"
                    name="ingredients"
                    placeholder="Enter each ingredient on a new line"
                    value={formData.ingredients}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>
                
                {/* Instructions */}
                <div>
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea 
                    id="instructions"
                    name="instructions"
                    placeholder="Enter step-by-step instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows={8}
                    required
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <ChefHat className="h-4 w-4" />
                      Add Recipe
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      {/* Recipe Parser Dialog */}
      <RecipeParserDialog
        isOpen={isParsingDialogOpen}
        onClose={() => setIsParsingDialogOpen(false)}
        isParsing={isParsing}
        parseResult={parseResult}
        onApplyParsedData={applyParsedData}
      />
      
      <Footer />
    </div>
  );
};

export default NewRecipe;
