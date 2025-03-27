
import React, { useState } from 'react';
import { 
  ShoppingBag, 
  FileText, 
  Trash2, 
  Check,
  CheckCircle2,
  ShoppingCart
} from 'lucide-react';
import { usePantry } from '../PantryContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

const ShoppingListView = () => {
  const { shoppingList, setShoppingList } = usePantry();
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  const { toast } = useToast();
  
  // Calculate total quantities for each ingredient by combining across recipes
  const aggregatedItems = shoppingList.reduce((acc, item) => {
    const key = `${item.name.toLowerCase()}-${item.unit}`;
    if (!acc[key]) {
      acc[key] = {
        ...item,
        recipes: [...new Set(item.recipes)],
        classNames: [item.className]
      };
    } else {
      acc[key].quantity += item.quantity;
      acc[key].recipes = [...new Set([...acc[key].recipes, ...item.recipes])];
      if (!acc[key].classNames.includes(item.className)) {
        acc[key].classNames.push(item.className);
      }
    }
    return acc;
  }, {} as Record<string, any>);
  
  const aggregatedList = Object.values(aggregatedItems);
  
  const togglePurchased = (itemId: string) => {
    setPurchasedItems({
      ...purchasedItems,
      [itemId]: !purchasedItems[itemId]
    });
    
    toast({
      title: purchasedItems[itemId] ? "Item unmarked" : "Item marked as purchased",
      description: purchasedItems[itemId] 
        ? "Item has been removed from purchased items" 
        : "Item has been added to your purchased items",
    });
  };
  
  const startEditing = (item: any) => {
    setEditingItem(item.id);
    setEditedQuantity(item.quantity);
  };
  
  const saveEditedQuantity = (item: any) => {
    // Find all items with the same name and unit
    const updatedShoppingList = shoppingList.map(listItem => {
      if (
        listItem.name.toLowerCase() === item.name.toLowerCase() && 
        listItem.unit === item.unit
      ) {
        // Calculate the ratio to distribute quantity changes proportionally
        const ratio = editedQuantity / item.quantity;
        return {
          ...listItem,
          quantity: listItem.quantity * ratio
        };
      }
      return listItem;
    });
    
    setShoppingList(updatedShoppingList);
    setEditingItem(null);
    
    toast({
      title: "Quantity updated",
      description: `Updated quantity for ${item.name} to ${editedQuantity} ${item.unit}`,
    });
  };
  
  const removeItem = (item: any) => {
    // Remove all items with the same name and unit
    const filteredList = shoppingList.filter(
      listItem => !(
        listItem.name.toLowerCase() === item.name.toLowerCase() && 
        listItem.unit === item.unit
      )
    );
    
    setShoppingList(filteredList);
    
    // Also remove from purchased items if it was there
    if (purchasedItems[item.id]) {
      const { [item.id]: _, ...remainingPurchased } = purchasedItems;
      setPurchasedItems(remainingPurchased);
    }
    
    toast({
      title: "Item removed",
      description: `${item.name} has been removed from your shopping list`,
      variant: "destructive"
    });
  };
  
  const exportList = () => {
    // Create a text representation of the shopping list
    let exportText = "SHOPPING LIST\n\n";
    
    // Group by category (using classNames for now as category)
    const categorized: Record<string, any[]> = {};
    
    aggregatedList.forEach(item => {
      const category = item.classNames.join(', ');
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(item);
    });
    
    // Build the text content
    Object.entries(categorized).forEach(([category, items]) => {
      exportText += `== ${category} ==\n`;
      items.forEach(item => {
        const isPurchased = purchasedItems[item.id] ? "[✓] " : "[ ] ";
        exportText += `${isPurchased}${item.quantity} ${item.unit} ${item.name} (${item.recipes.join(', ')})\n`;
      });
      exportText += "\n";
    });
    
    // Create a downloadable file
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "List exported",
      description: "Shopping list has been exported as a text file",
    });
  };
  
  const clearPurchasedItems = () => {
    // Find IDs to remove
    const idsToRemove = Object.entries(purchasedItems)
      .filter(([_, isPurchased]) => isPurchased)
      .map(([id]) => id);
    
    if (idsToRemove.length === 0) {
      toast({
        title: "No purchased items",
        description: "There are no purchased items to clear",
      });
      return;
    }
    
    // Find names to remove (need to handle aggregated items)
    const namesToRemove: Record<string, string> = {};
    aggregatedList.forEach(item => {
      if (purchasedItems[item.id]) {
        const key = `${item.name.toLowerCase()}-${item.unit}`;
        namesToRemove[key] = item.name;
      }
    });
    
    // Filter out purchased items
    const filteredList = shoppingList.filter(item => {
      const key = `${item.name.toLowerCase()}-${item.unit}`;
      return !namesToRemove[key];
    });
    
    setShoppingList(filteredList);
    setPurchasedItems({});
    
    toast({
      title: "Purchased items cleared",
      description: `${idsToRemove.length} item(s) have been removed from your shopping list`,
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-primary mr-2" />
            <CardTitle>Shopping List</CardTitle>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={clearPurchasedItems}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span>Clear Purchased</span>
            </Button>
            <Button 
              className="flex items-center" 
              onClick={exportList}
            >
              <FileText className="h-4 w-4 mr-1" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {aggregatedList.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Your shopping list is empty</h3>
            <p className="text-gray-400">
              Items that need to be ordered will appear here
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Status</TableHead>
                  <TableHead>Ingredient</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>For Recipe(s)</TableHead>
                  <TableHead>Class(es)</TableHead>
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
                      <div className="flex flex-wrap gap-1">
                        {item.recipes.map((recipe: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {recipe}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.classNames.map((className: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {className}
                          </Badge>
                        ))}
                      </div>
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShoppingListView;
