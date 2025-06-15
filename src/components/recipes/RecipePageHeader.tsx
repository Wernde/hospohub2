
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecipePageHeaderProps {
  title: string;
  description?: string;
}

const RecipePageHeader: React.FC<RecipePageHeaderProps> = ({ title, description }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        className="mb-6 text-black hover:bg-stone-200" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="flex items-center mb-6">
        <div className="bg-orange-500 p-2 rounded-lg mr-3">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-black">{title}</h1>
          {description && <p className="text-black mt-1">{description}</p>}
        </div>
      </div>
    </>
  );
};

export default RecipePageHeader;
