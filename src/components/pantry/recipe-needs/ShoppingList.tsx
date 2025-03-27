
import React from 'react';
import { ShoppingBag, FileText, ExternalLink } from 'lucide-react';
import { usePantry } from '../PantryContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Link } from 'react-router-dom';

interface ShoppingListProps {
  standalone?: boolean;
}

const ShoppingList = ({ standalone = false }: ShoppingListProps) => {
  const { shoppingList } = usePantry();
  
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
  
  const content = (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Shopping List</h2>
        <div className="flex space-x-2">
          <Button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FileText className="h-4 w-4 mr-1" />
            <span>Export</span>
          </Button>
          <Link to="/shopping">
            <Button className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <ExternalLink className="h-4 w-4 mr-1" />
              <span>Full View</span>
            </Button>
          </Link>
        </div>
      </div>
      
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
                <TableHead>Ingredient</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>For Recipe(s)</TableHead>
                <TableHead>Class(es)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aggregatedList.map((item: any) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity.toFixed(2)} {item.unit}</TableCell>
                  <TableCell>{item.recipes.join(', ')}</TableCell>
                  <TableCell>{item.classNames.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
  
  if (standalone) {
    return (
      <Card>
        <CardContent className="pt-6">
          {content}
        </CardContent>
      </Card>
    );
  }
  
  return content;
};

export default ShoppingList;
