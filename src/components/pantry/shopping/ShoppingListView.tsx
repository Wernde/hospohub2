
import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  FileText, 
  Trash2, 
  Check,
  CheckCircle2,
  ShoppingCart,
  Store,
  Calendar,
  Tag,
  DollarSign,
  List
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
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ShoppingListView = () => {
  const { shoppingList, setShoppingList } = usePantry();
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'list' | 'byRecipe' | 'byCategory'>('list');
  const [selectedStore, setSelectedStore] = useState<string>('local-market');
  const { toast } = useToast();
  
  // Sample store data (in a real app, this would come from an API or database)
  const stores = [
    { id: 'local-market', name: 'Local Market' },
    { id: 'fresh-foods', name: 'Fresh Foods' },
    { id: 'super-store', name: 'Super Store' },
    { id: 'bulk-buy', name: 'Bulk Buy' }
  ];
  
  // Sample price data (in a real app, this would come from an API)
  const storePrices: Record<string, Record<string, number>> = {
    'local-market': {},
    'fresh-foods': {},
    'super-store': {},
    'bulk-buy': {}
  };
  
  // Calculate total quantities for each ingredient by combining across recipes
  const aggregatedItems = useMemo(() => {
    return shoppingList.reduce((acc, item) => {
      const key = `${item.name.toLowerCase()}-${item.unit}`;
      if (!acc[key]) {
        acc[key] = {
          ...item,
          recipes: [...new Set(item.recipes)],
          classNames: [item.className],
          // Simulate random prices for each store
          prices: {
            'local-market': +(Math.random() * 5 + 1).toFixed(2),
            'fresh-foods': +(Math.random() * 5 + 1).toFixed(2), 
            'super-store': +(Math.random() * 5 + 1).toFixed(2),
            'bulk-buy': +(Math.random() * 5 + 0.5).toFixed(2)
          },
          // Simulate a random category
          category: ['Produce', 'Dairy', 'Meat', 'Bakery', 'Dry Goods', 'Frozen', 'Beverages'][
            Math.floor(Math.random() * 7)
          ]
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
  }, [shoppingList]);
  
  const aggregatedList = Object.values(aggregatedItems);
  
  // Group items by recipe
  const itemsByRecipe = useMemo(() => {
    const groupedItems: Record<string, any[]> = {};
    
    aggregatedList.forEach(item => {
      item.recipes.forEach((recipe: string) => {
        if (!groupedItems[recipe]) {
          groupedItems[recipe] = [];
        }
        groupedItems[recipe].push(item);
      });
    });
    
    return groupedItems;
  }, [aggregatedList]);
  
  // Group items by category
  const itemsByCategory = useMemo(() => {
    const groupedItems: Record<string, any[]> = {};
    
    aggregatedList.forEach(item => {
      const category = item.category || 'Uncategorized';
      
      if (!groupedItems[category]) {
        groupedItems[category] = [];
      }
      groupedItems[category].push(item);
    });
    
    return groupedItems;
  }, [aggregatedList]);
  
  // Calculate total cost
  const calculateTotalCost = (items: any[]) => {
    return items.reduce((total, item) => {
      return total + (item.prices?.[selectedStore] || 0) * item.quantity;
    }, 0).toFixed(2);
  };
  
  // Total cost for all items
  const totalCost = calculateTotalCost(aggregatedList);
  
  // Calculate cost per recipe
  const recipeCosts = useMemo(() => {
    const costs: Record<string, number> = {};
    
    Object.entries(itemsByRecipe).forEach(([recipe, items]) => {
      costs[recipe] = +calculateTotalCost(items);
    });
    
    return costs;
  }, [itemsByRecipe, selectedStore]);
  
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
      const category = item.category || 'Uncategorized';
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(item);
    });
    
    // Build the text content
    exportText += `Store: ${stores.find(s => s.id === selectedStore)?.name || 'Any'}\n`;
    exportText += `Total Cost: $${totalCost}\n\n`;
    
    Object.entries(categorized).forEach(([category, items]) => {
      exportText += `== ${category} ==\n`;
      items.forEach(item => {
        const isPurchased = purchasedItems[item.id] ? "[✓] " : "[ ] ";
        const price = item.prices?.[selectedStore] ? `$${item.prices[selectedStore].toFixed(2)}` : 'N/A';
        exportText += `${isPurchased}${item.quantity} ${item.unit} ${item.name} - ${price} (${item.recipes.join(', ')})\n`;
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
  
  const renderStandardTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Status</TableHead>
          <TableHead>Ingredient</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price ({stores.find(s => s.id === selectedStore)?.name})</TableHead>
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
  
  const renderRecipeView = () => (
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
  
  const renderCategoryView = () => (
    <div className="space-y-6">
      {Object.entries(itemsByCategory).map(([category, items]) => (
        <Card key={category} className="overflow-hidden">
          <CardHeader className="bg-muted/50 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-lg">{category}</CardTitle>
              </div>
              <div className="text-sm font-medium">
                {items.length} item{items.length !== 1 ? 's' : ''}
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
                  <TableHead>For Recipe(s)</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item: any) => (
                  <TableRow 
                    key={`${category}-${item.id}`} 
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
                      <div className="flex flex-wrap gap-1">
                        {item.recipes.map((recipe: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {recipe}
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-primary mr-2" />
            <CardTitle>Shopping List</CardTitle>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center">
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-[180px]">
                  <Store className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map(store => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-wrap gap-2">
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
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Tabs 
            value={viewMode} 
            onValueChange={(value) => setViewMode(value as 'list' | 'byRecipe' | 'byCategory')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list" className="flex items-center gap-1">
                <List className="h-4 w-4" />
                <span>List View</span>
              </TabsTrigger>
              <TabsTrigger value="byRecipe" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>By Recipe</span>
              </TabsTrigger>
              <TabsTrigger value="byCategory" className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>By Category</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {aggregatedList.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-muted-foreground mr-1" />
              <span className="text-sm font-medium">
                Total: <span className="text-primary font-bold">${totalCost}</span>
              </span>
            </div>
            
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="text-sm text-muted-foreground">
                {aggregatedList.length} item{aggregatedList.length !== 1 ? 's' : ''} in list
              </span>
            </div>
          </div>
        )}
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
            {viewMode === 'list' && renderStandardTable()}
            {viewMode === 'byRecipe' && renderRecipeView()}
            {viewMode === 'byCategory' && renderCategoryView()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShoppingListView;
