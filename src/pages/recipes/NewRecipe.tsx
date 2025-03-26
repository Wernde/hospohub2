
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecipeForm from '@/components/recipes/RecipeForm';
import RecipePageHeader from '@/components/recipes/RecipePageHeader';
import { simulateRecipeParsing } from '@/utils/recipeParser';
import { RecipeFormData } from '@/components/recipes/RecipeFormHandler';

const NewRecipe = () => {
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
          <RecipePageHeader title="Add New Recipe" />
          
          <RecipeForm
            onFileSelect={handleFileSelect}
            isParsing={isParsing}
            parseResult={parseResult}
            isParsingDialogOpen={isParsingDialogOpen}
            setIsParsingDialogOpen={setIsParsingDialogOpen}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewRecipe;
