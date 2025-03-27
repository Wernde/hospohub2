
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Check, Trash2 } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface RecipeViewProps {
  itemsByRecipe: Record<string, any[]>;
  purchasedItems: Record<string, boolean>;
  editingItem: string | null;
  editedQuantity: number;
  selectedStore: string;
  calculateTotalCost: (items: any[]) => string;
  togglePurchased: (itemId: string) => void;
  startEditing: (item: any) => void;
  setEditedQuantity: (value: number) => void;
  saveEditedQuantity: (item: any) => void;
  removeItem: (item: any) => void;
}

const RecipeView = ({
  itemsByRecipe,
  purchasedItems,
  editingItem,
  editedQuantity,
  selectedStore,
  calculateTotalCost,
  togglePurchased,
  startEditing,
  setEditedQuantity,
  saveEditedQuantity,
  removeItem
}: RecipeViewProps) => {
  return (
    <div className="space-y-6">
      {Object.entries(itemsByRecipe).map(([recipe, items]) => (
        <Card key={recipe} className="overflow-hidden">
          <CardHeader className="bg-muted/50 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-lg">{recipe}</CardTitle>
              </div>
              <div className="text-sm font-medium">
                Total: ${calculateTotalCost(items)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Status</TableHead>
                  <TableHead>Ingredient</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item: any) => (
                  <TableRow 
                    key={`${recipe}-${item.id}`} 
                    className={purchasedItems[item.id] ? "bg-gray-50" : "hover:bg-gray-50"}
                  >
                    <TableCell>
                      <Checkbox
                        checked={!!purchasedItems[item.id]}
                        onCheckedChange={() => togglePurchased(item.id)}
                      />
                    </TableCell>
                    <TableCell className={`font-medium ${purchasedItems[item.id] ? "line-through text-gray-400" : ""}`}>
                      {item.name}
                    </TableCell>
                    <TableCell>
                      {editingItem === item.id ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            min="0.1"
                            step="0.1"
                            className="w-20 h-8"
                            value={editedQuantity}
                            onChange={(e) => setEditedQuantity(parseFloat(e.target.value) || 0)}
                          />
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 px-2" 
                            onClick={() => saveEditedQuantity(item)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <span 
                          className={`cursor-pointer ${purchasedItems[item.id] ? "line-through text-gray-400" : ""}`}
                          onClick={() => startEditing(item)}
                        >
                          {item.quantity.toFixed(2)} {item.unit}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      ${item.prices?.[selectedStore]?.toFixed(2) || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {item.category || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive" 
                        onClick={() => removeItem(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecipeView;
