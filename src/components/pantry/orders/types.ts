
export type OrderStatus = 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'delayed';

export interface OrderItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  category?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  storeId: string;
  status: OrderStatus;
  orderDate: string;
  estimatedDelivery?: string;
  deliveryDate?: string;
  totalAmount: number;
  items: OrderItem[];
}
