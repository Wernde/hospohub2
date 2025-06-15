
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { PantryProvider } from '@/components/pantry/context/PantryProvider';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import OrderTracking from '@/components/pantry/orders/OrderTracking';

const OrdersPage = () => {
  return (
    <PantryProvider>
      <div className="flex flex-col w-full min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto flex flex-col gap-4 p-4 pt-24 text-black page-transition">
          <div className="flex justify-between items-center mb-4">
            <Link to="/pantry">
              <Button variant="outline" className="flex items-center bg-stone-200 hover:bg-stone-300 border-stone-400 text-black">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pantry
              </Button>
            </Link>
            <Link to="/pantry/settings">
              <Button variant="outline" className="flex items-center bg-stone-200 hover:bg-stone-300 border-stone-400 text-black">
                <Settings className="mr-2 h-4 w-4" />
                Store Settings
              </Button>
            </Link>
          </div>
          
          <OrderTracking />
        </div>
        <Toaster />
      </div>
    </PantryProvider>
  );
};

export default OrdersPage;
