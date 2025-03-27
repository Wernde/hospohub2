
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import PantryInventory from './inventory/PantryInventory';
import RecipeNeedsPanel from './recipe-needs/RecipeNeedsPanel';
import ShoppingList from './recipe-needs/ShoppingList';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const PantryLayout = () => {
  const [activeTab, setActiveTab] = useState('combined');

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4 pt-24">
      <div className="flex justify-between items-center mb-2">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="combined">Combined View</TabsTrigger>
              <TabsTrigger value="inventory">Pantry Inventory</TabsTrigger>
              <TabsTrigger value="recipes">Recipe Needs</TabsTrigger>
            </TabsList>
            <Link to="/shopping" className="ml-4">
              <Button variant="outline" className="flex items-center">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Shopping List
              </Button>
            </Link>
          </div>
          
          <TabsContent value="combined" className="mt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left panel - Pantry inventory */}
              <div className="w-full md:w-1/3 bg-card shadow-sm rounded-lg overflow-y-auto">
                <PantryInventory />
              </div>
              
              {/* Right panel - Recipe needs and shopping list */}
              <div className="w-full md:w-2/3 overflow-y-auto">
                <RecipeNeedsPanel />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory" className="mt-6">
            <div className="flex flex-col gap-6">
              <div className="w-full bg-card shadow-sm rounded-lg overflow-y-auto">
                <PantryInventory />
              </div>
              
              <div className="w-full shadow-sm rounded-lg overflow-y-auto">
                <ShoppingList standalone={true} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recipes" className="mt-6">
            <div className="flex flex-col gap-6">
              <div className="w-full shadow-sm rounded-lg overflow-y-auto">
                <RecipeNeedsPanel showShoppingList={false} />
              </div>
              
              <div className="w-full shadow-sm rounded-lg overflow-y-auto">
                <ShoppingList standalone={true} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PantryLayout;
