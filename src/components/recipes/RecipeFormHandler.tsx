
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface RecipeFormData {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string;
  instructions: string;
}

interface RecipeFormHandlerProps {
  initialData?: RecipeFormData;
  parsedData?: RecipeFormData | null;
  children: (props: {
    formData: RecipeFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    setParsedData: (data: RecipeFormData) => void;
  }) => React.ReactNode;
}

const defaultFormData: RecipeFormData = {
  title: '',
  description: '',
  prepTime: '',
  cookTime: '',
  servings: '',
  difficulty: 'medium',
  ingredients: '',
  instructions: ''
};

const RecipeFormHandler = ({ children, initialData = defaultFormData, parsedData }: RecipeFormHandlerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RecipeFormData>(initialData);

  // Apply parsed data if provided
  if (parsedData && formData === initialData) {
    setFormData(parsedData);
  }

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
      navigate('/recipes');
    }, 1500);
  };

  const setParsedData = (data: RecipeFormData) => {
    setFormData(data);
    toast({
      title: "Recipe Data Applied",
      description: "The recipe information has been filled in from your file.",
    });
  };

  return children({
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    setParsedData,
  });
};

export default RecipeFormHandler;
