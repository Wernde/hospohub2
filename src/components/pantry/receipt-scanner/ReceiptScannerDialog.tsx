
import React, { useState } from 'react';
import { Camera, UploadCloud, FilePlus, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import ReceiptUploader from './ReceiptUploader';
import ReceiptPreview from './ReceiptPreview';
import ExtractedIngredients from './ExtractedIngredients';
import { useToast } from '@/hooks/use-toast';
import { usePantry } from '@/components/pantry/context/usePantry';

export type ExtractedIngredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price?: number;
  category?: string;
  selected: boolean;
};

const ReceiptScannerDialog = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'upload' | 'preview' | 'confirm'>('upload');
  const [receipt, setReceipt] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedIngredients, setExtractedIngredients] = useState<ExtractedIngredient[]>([]);
  const { toast } = useToast();
  const { pantryItems, setPantryItems } = usePantry();

  const handleUpload = (imageData: string) => {
    setReceipt(imageData);
    setStep('preview');
  };

  const handleAnalyze = async () => {
    if (!receipt) return;

    setIsAnalyzing(true);
    
    try {
      // In a real implementation, this would call an API to analyze the receipt
      // For now, we'll simulate with a timeout and mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock extracted ingredients
      const mockIngredients: ExtractedIngredient[] = [
        { id: '1', name: 'Milk', quantity: 1, unit: 'L', price: 3.99, category: 'Dairy & Eggs', selected: true },
        { id: '2', name: 'Eggs', quantity: 12, unit: 'each', price: 4.50, category: 'Dairy & Eggs', selected: true },
        { id: '3', name: 'Bread', quantity: 1, unit: 'each', price: 2.49, category: 'Bakery', selected: true },
        { id: '4', name: 'Apples', quantity: 6, unit: 'each', price: 5.99, category: 'Fruits', selected: true },
        { id: '5', name: 'Chicken Breast', quantity: 0.5, unit: 'kg', price: 8.99, category: 'Proteins', selected: true },
      ];
      
      setExtractedIngredients(mockIngredients);
      setStep('confirm');
    } catch (error) {
      console.error('Error analyzing receipt:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Unable to analyze the receipt. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleIngredientSelection = (id: string) => {
    setExtractedIngredients(ingredients => 
      ingredients.map(ing => 
        ing.id === id ? { ...ing, selected: !ing.selected } : ing
      )
    );
  };

  const handleAddToPantry = () => {
    const selectedIngredients = extractedIngredients.filter(ing => ing.selected);
    
    // Add selected ingredients to pantry
    const newPantryItems = selectedIngredients.map(ing => ({
      id: `p${Date.now()}-${ing.id}`,
      ingredientName: ing.name,
      category: ing.category || 'Other',
      currentQuantity: ing.quantity,
      unit: ing.unit,
      location: '',
      expirationDate: '',
      lastUpdated: new Date().toISOString().split('T')[0],
      lowStockThreshold: ing.quantity * 0.2, // Default to 20% of quantity
      isLowStock: false,
      recipeUnit: ing.unit,
      conversionFactor: 1
    }));
    
    setPantryItems([...pantryItems, ...newPantryItems]);
    
    toast({
      title: 'Items Added',
      description: `Added ${selectedIngredients.length} items to your pantry.`,
    });
    
    // Reset state and close dialog
    setOpen(false);
    setStep('upload');
    setReceipt(null);
    setExtractedIngredients([]);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep('upload');
      setReceipt(null);
      setExtractedIngredients([]);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Camera className="h-4 w-4" />
          <span>Scan Receipt</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {step === 'upload' && 'Scan or Upload Receipt'}
            {step === 'preview' && 'Receipt Preview'}
            {step === 'confirm' && 'Confirm Ingredients'}
          </DialogTitle>
          <DialogDescription>
            {step === 'upload' && 'Take a photo or upload an image of your receipt'}
            {step === 'preview' && 'Review your receipt before analyzing'}
            {step === 'confirm' && 'Confirm the items to add to your pantry'}
          </DialogDescription>
        </DialogHeader>

        {step === 'upload' && (
          <ReceiptUploader onUpload={handleUpload} />
        )}

        {step === 'preview' && receipt && (
          <>
            <ReceiptPreview image={receipt} />
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={() => setStep('upload')}>
                Back
              </Button>
              <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                {isAnalyzing ? 'Analyzing...' : 'Analyze Receipt'}
              </Button>
            </div>
          </>
        )}

        {step === 'confirm' && (
          <>
            <ExtractedIngredients 
              ingredients={extractedIngredients} 
              onToggleSelection={toggleIngredientSelection} 
            />
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={() => setStep('preview')}>
                Back
              </Button>
              <Button 
                onClick={handleAddToPantry}
                disabled={!extractedIngredients.some(ing => ing.selected)}
              >
                Add to Pantry
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptScannerDialog;
