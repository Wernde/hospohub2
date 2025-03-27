
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Package, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import { OrderStatus } from './types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'processing':
        return {
          label: 'Processing',
          variant: 'outline' as const,
          icon: <Clock className="h-3 w-3 mr-1" />
        };
      case 'shipped':
        return {
          label: 'Shipped',
          variant: 'secondary' as const,
          icon: <Package className="h-3 w-3 mr-1" />
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery',
          variant: 'default' as const,
          icon: <Truck className="h-3 w-3 mr-1" />
        };
      case 'delivered':
        return {
          label: 'Delivered',
          variant: 'success' as const,
          icon: <CheckCircle className="h-3 w-3 mr-1" />
        };
      case 'delayed':
        return {
          label: 'Delayed',
          variant: 'destructive' as const,
          icon: <AlertCircle className="h-3 w-3 mr-1" />
        };
      default:
        return {
          label: 'Unknown',
          variant: 'outline' as const,
          icon: null
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge variant={config.variant} className="flex items-center">
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default OrderStatusBadge;
