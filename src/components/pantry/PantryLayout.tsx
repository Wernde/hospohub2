
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import PantryInventory from './inventory/PantryInventory';
import RecipeNeedsPanel from './recipe-needs/RecipeNeedsPanel';
import ShoppingList from './recipe-needs/ShoppingList';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface PantryLayoutProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
}

const PantryLayout: React.FC<PantryLayoutProps> = ({ 
  children, 
  title = "Pantry", 
  description = "Manage your pantry inventory",
  actions 
}) => {
  const [activeTab, setActiveTab] = React.useState('combined');

  return (
    <div className="container mx-auto flex flex-col gap-6 p-4 pt-24 text-black">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-black">{title}</h1>
            {description && <p className="text-black">{description}</p>}
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <Link to="/shopping" className="ml-2">
              <Button variant="outline" className="flex items-center bg-stone-200 hover:bg-stone-300 border-stone-400 text-black">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Shopping List
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {children ? (
        children
      ) : (
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-full grid-cols-3 bg-stone-200">
              <TabsTrigger value="combined" className="bg-stone-100 data-[state=active]:bg-stone-400 data-[state=active]:text-white text-black">Combined View</TabsTrigger>
              <TabsTrigger value="inventory" className="bg-stone-100 data-[state=active]:bg-stone-400 data-[state=active]:text-white text-black">Pantry Inventory</TabsTrigger>
              <TabsTrigger value="recipes" className="bg-stone-100 data-[state=active]:bg-stone-400 data-[state=active]:text-white text-black">Recipe Needs</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="combined" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
              <div className="lg:col-span-1 bg-stone-100 shadow-sm rounded-lg p-6 overflow-y-auto max-h-[800px]">
                <PantryInventory />
              </div>
              
              <div className="lg:col-span-2 bg-stone-100 shadow-sm rounded-lg p-6 overflow-y-auto max-h-[800px]">
                <RecipeNeedsPanel />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory" className="mt-0">
            <div className="flex flex-col gap-6">
              <div className="w-full bg-stone-100 shadow-sm rounded-lg p-6 overflow-y-auto">
                <PantryInventory />
              </div>
              
              <div className="w-full shadow-sm rounded-lg overflow-y-auto">
                <ShoppingList standalone={true} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recipes" className="mt-0">
            <div className="flex flex-col gap-6">
              <div className="w-full shadow-sm rounded-lg p-6 overflow-y-auto">
                <RecipeNeedsPanel showShoppingList={false} />
              </div>
              
              <div className="w-full shadow-sm rounded-lg overflow-y-auto">
                <ShoppingList standalone={true} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PantryLayout;
