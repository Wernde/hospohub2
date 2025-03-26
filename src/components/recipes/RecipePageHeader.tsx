
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecipePageHeaderProps {
  title: string;
}

const RecipePageHeader: React.FC<RecipePageHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  
  return (
    <>
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
        <h1 className="text-2xl font-semibold text-blue-900">{title}</h1>
      </div>
    </>
  );
};

export default RecipePageHeader;
