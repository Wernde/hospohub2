
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, Trash2 } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface StandardTableViewProps {
  aggregatedList: any[];
  purchasedItems: Record<string, boolean>;
  editingItem: string | null;
  editedQuantity: number;
  selectedStore: string;
  togglePurchased: (itemId: string) => void;
  startEditing: (item: any) => void;
  setEditedQuantity: (value: number) => void;
  saveEditedQuantity: (item: any) => void;
  removeItem: (item: any) => void;
}

const StandardTableView = ({
  aggregatedList,
  purchasedItems,
  editingItem,
  editedQuantity,
  selectedStore,
  togglePurchased,
  startEditing,
  setEditedQuantity,
  saveEditedQuantity,
  removeItem
}: StandardTableViewProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Status</TableHead>
          <TableHead>Ingredient</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>For Recipe(s)</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {aggregatedList.map((item: any) => (
          <TableRow 
            key={item.id} 
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
              {item.prices && (
                <div className="text-xs text-muted-foreground">
                  Total: ${((item.prices[selectedStore] || 0) * item.quantity).toFixed(2)}
                </div>
              )}
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {item.recipes.map((recipe: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {recipe}
                  </Badge>
                ))}
              </div>
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
  );
};

export default StandardTableView;
