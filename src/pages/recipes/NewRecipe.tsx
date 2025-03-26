
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageUpload from '@/components/recipes/ImageUpload';
import RecipeFileUpload from '@/components/recipes/RecipeFileUpload';
import RecipeParserDialog from '@/components/recipes/RecipeParserDialog';
import RecipeFormHandler, { RecipeFormData } from '@/components/recipes/RecipeFormHandler';
import RecipeBasicInfo from '@/components/recipes/RecipeBasicInfo';
import RecipeMetrics from '@/components/recipes/RecipeMetrics';
import DifficultySelector from '@/components/recipes/DifficultySelector';
import RecipeIngredientsInstructions from '@/components/recipes/RecipeIngredientsInstructions';
import RecipeFormActions from '@/components/recipes/RecipeFormActions';

// Mock function to simulate recipe parsing
const simulateRecipeParsing = async (file: File): Promise<{
  success: boolean;
  message: string;
  data?: RecipeFormData;
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
  const [recipeImage, setRecipeImage] = useState<File | null>(null);
  const [isParsingDialogOpen, setIsParsingDialogOpen] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseResult, setParseResult] = useState<null | {
    success: boolean;
    message: string;
    data?: RecipeFormData;
  }>(null);

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
            
            <RecipeFormHandler>
              {({ formData, handleChange, handleSubmit, isSubmitting, setParsedData }) => (
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    {/* Image Upload */}
                    <ImageUpload 
                      onChange={setRecipeImage}
                      value={recipeImage}
                    />
                    
                    {/* Basic Information */}
                    <RecipeBasicInfo
                      title={formData.title}
                      description={formData.description}
                      onChange={handleChange}
                    />
                    
                    {/* Recipe Metrics */}
                    <RecipeMetrics
                      prepTime={formData.prepTime}
                      cookTime={formData.cookTime}
                      servings={formData.servings}
                      onChange={handleChange}
                    />
                    
                    {/* Difficulty Level */}
                    <DifficultySelector
                      value={formData.difficulty}
                      onChange={handleChange}
                    />
                    
                    {/* Ingredients and Instructions */}
                    <RecipeIngredientsInstructions
                      ingredients={formData.ingredients}
                      instructions={formData.instructions}
                      onChange={handleChange}
                    />
                  </CardContent>
                  
                  <CardFooter>
                    <RecipeFormActions isSubmitting={isSubmitting} />
                  </CardFooter>
                  
                  {/* Recipe Parser Dialog */}
                  <RecipeParserDialog
                    isOpen={isParsingDialogOpen}
                    onClose={() => setIsParsingDialogOpen(false)}
                    isParsing={isParsing}
                    parseResult={parseResult}
                    onApplyParsedData={() => {
                      if (parseResult?.success && parseResult.data) {
                        setParsedData(parseResult.data);
                        setIsParsingDialogOpen(false);
                      }
                    }}
                  />
                </form>
              )}
            </RecipeFormHandler>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewRecipe;
