
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface RecipeParserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isParsing: boolean;
  parseResult: null | {
    success: boolean;
    message: string;
  };
  onApplyParsedData: () => void;
}

const RecipeParserDialog = ({
  isOpen,
  onClose,
  isParsing,
  parseResult,
  onApplyParsedData
}: RecipeParserDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recipe File Parsing</DialogTitle>
          <DialogDescription>
            Analyzing your recipe file to extract information
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4 space-y-4">
          {isParsing ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-center text-sm text-muted-foreground">
                Analyzing your recipe file...
              </p>
            </>
          ) : parseResult ? (
            <>
              {parseResult.success ? (
                <div className="text-center space-y-2">
                  <p className="text-green-600 font-medium">Success!</p>
                  <p className="text-sm text-muted-foreground">{parseResult.message}</p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <p className="text-red-600 font-medium">Parsing Failed</p>
                  <p className="text-sm text-muted-foreground">{parseResult.message}</p>
                </div>
              )}
            </>
          ) : null}
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          {parseResult?.success && (
            <Button
              type="button"
              onClick={onApplyParsedData}
            >
              Apply Data
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeParserDialog;
