
import React, { useState, useEffect } from 'react';
import { Package, Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePantry } from '../context/usePantry';
import { useStoreSettings } from '../shopping/hooks/useStoreSettings';
import { Order, OrderStatus } from './types';
import { mockOrders } from './mockData';
import OrderStatusBadge from './OrderStatusBadge';

const OrderTracking = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { stores } = useStoreSettings();
  const { pantryItems, setPantryItems } = usePantry();
  const { toast } = useToast();

  // Function to get store name by ID
  const getStoreName = (storeId: string) => {
    const store = stores.find(s => s.id === storeId);
    return store ? store.name : 'Unknown Store';
  };

  // Function to mark an order as received
  const markAsReceived = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'delivered', deliveryDate: new Date().toISOString() } 
          : order
      )
    );

    // Find the order that was marked as received
    const receivedOrder = orders.find(order => order.id === orderId);
    
    if (receivedOrder) {
      // Update pantry inventory with items from the order
      const updatedPantryItems = [...pantryItems];
      
      receivedOrder.items.forEach(orderItem => {
        // Check if the item already exists in the pantry
        const existingItemIndex = pantryItems.findIndex(
          item => item.ingredientName.toLowerCase() === orderItem.name.toLowerCase()
        );
        
        if (existingItemIndex !== -1) {
          // Update existing item
          updatedPantryItems[existingItemIndex] = {
            ...updatedPantryItems[existingItemIndex],
            currentQuantity: updatedPantryItems[existingItemIndex].currentQuantity + orderItem.quantity,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        } else {
          // Add new item to pantry
          const newItem = {
            id: `p${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            ingredientName: orderItem.name,
            category: orderItem.category || 'Other',
            currentQuantity: orderItem.quantity,
            unit: orderItem.unit,
            location: '',
            expirationDate: '',
            lastUpdated: new Date().toISOString().split('T')[0],
            lowStockThreshold: orderItem.quantity * 0.2, // Default to 20% of quantity
            isLowStock: false,
            recipeUnit: orderItem.unit,
            conversionFactor: 1
          };
          
          updatedPantryItems.push(newItem);
        }
      });
      
      // Update pantry items in context
      setPantryItems(updatedPantryItems);
      
      // Show success toast
      toast({
        title: "Order Received",
        description: `${receivedOrder.items.length} items have been added to your pantry.`,
        variant: "default"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Order Tracking</h2>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => {/* Would refresh orders */}}>
          <Clock className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      {orders.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No orders to track at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => (
            <Card key={order.id} className={order.status === 'delivered' ? 'border-green-200 bg-green-50' : ''}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg">{getStoreName(order.storeId)}</CardTitle>
                    <CardDescription>Order #{order.orderNumber}</CardDescription>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                  {order.estimatedDelivery && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Delivery:</span>
                      <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                    </div>
                  )}
                  {order.deliveryDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivered On:</span>
                      <span>{new Date(order.deliveryDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="mt-4">
                    <span className="text-sm font-medium">Items: {order.items.length}</span>
                    <ul className="mt-2 space-y-1">
                      {order.items.slice(0, 3).map((item, index) => (
                        <li key={index} className="text-sm flex justify-between">
                          <span>{item.name}</span>
                          <span>{item.quantity} {item.unit}</span>
                        </li>
                      ))}
                      {order.items.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          +{order.items.length - 3} more items
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {order.status !== 'delivered' ? (
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => markAsReceived(order.id)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Received
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Order Completed
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
