
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ExtractedIngredient } from './ReceiptScannerDialog';
import { X, Edit, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ExtractedIngredientsProps {
  ingredients: ExtractedIngredient[];
  onToggleSelection: (id: string) => void;
}

const ExtractedIngredients: React.FC<ExtractedIngredientsProps> = ({ 
  ingredients, 
  onToggleSelection 
}) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="max-h-[350px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="w-[50px]">Add</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No ingredients found in receipt
                </TableCell>
              </TableRow>
            ) : (
              ingredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>
                    <Checkbox 
                      checked={ingredient.selected}
                      onCheckedChange={() => onToggleSelection(ingredient.id)}
                      id={`select-${ingredient.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell>{ingredient.quantity} {ingredient.unit}</TableCell>
                  <TableCell>{ingredient.category || 'Uncategorized'}</TableCell>
                  <TableCell className="text-right">
                    ${ingredient.price?.toFixed(2) || '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {ingredients.length > 0 && (
        <div className="p-3 bg-muted/30 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {ingredients.filter(i => i.selected).length} of {ingredients.length} items selected
            </span>
            <span className="text-sm font-medium">
              Total: ${ingredients
                .filter(i => i.selected && i.price)
                .reduce((sum, i) => sum + (i.price || 0), 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtractedIngredients;
