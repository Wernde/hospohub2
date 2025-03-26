
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

interface NavigationButtonsProps {
  onNavigateBack: () => void;
  showSummary: boolean;
  setShowSummary: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (event: React.FormEvent) => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNavigateBack,
  showSummary,
  setShowSummary,
  onSubmit
}) => {
  if (showSummary) {
    return (
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowSummary(false)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>
        
        {onSubmit && (
          <Button 
            type="submit"
            onClick={onSubmit}
          >
            <Save className="h-4 w-4 mr-2" />
            Schedule Class
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex justify-between pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onNavigateBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Recipes
      </Button>
      
      <Button 
        type="button"
        onClick={() => setShowSummary(true)}
      >
        Review Summary
      </Button>
    </div>
  );
};

export default NavigationButtons;
