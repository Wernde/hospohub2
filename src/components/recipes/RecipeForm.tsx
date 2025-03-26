
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/recipes/ImageUpload';
import RecipeFileUpload from '@/components/recipes/RecipeFileUpload';
import RecipeParserDialog from '@/components/recipes/RecipeParserDialog';
import RecipeFormHandler, { RecipeFormData } from '@/components/recipes/RecipeFormHandler';
import RecipeBasicInfo from '@/components/recipes/RecipeBasicInfo';
import RecipeMetrics from '@/components/recipes/RecipeMetrics';
import DifficultySelector from '@/components/recipes/DifficultySelector';
import RecipeIngredientsInstructions from '@/components/recipes/RecipeIngredientsInstructions';
import RecipeFormActions from '@/components/recipes/RecipeFormActions';
import { useToast } from '@/hooks/use-toast';

interface RecipeFormProps {
  onFileSelect: (file: File) => void;
  isParsing: boolean;
  parseResult: null | {
    success: boolean;
    message: string;
    data?: RecipeFormData;
  };
  isParsingDialogOpen: boolean;
  setIsParsingDialogOpen: (isOpen: boolean) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  onFileSelect,
  isParsing,
  parseResult,
  isParsingDialogOpen,
  setIsParsingDialogOpen
}) => {
  const { toast } = useToast();
  const [recipeImage, setRecipeImage] = useState<File | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recipe Details</CardTitle>
      </CardHeader>
      
      {/* Recipe File Upload for AI Parsing */}
      <CardContent>
        <RecipeFileUpload onFileSelect={onFileSelect} />
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
                  toast({
                    title: "Recipe Data Applied",
                    description: "The recipe information has been filled in from your file.",
                  });
                }
              }}
            />
          </form>
        )}
      </RecipeFormHandler>
    </Card>
  );
};

export default RecipeForm;
