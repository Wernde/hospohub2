
import { Order } from './types';

// Generate a date in ISO format that is n days from today
const getDateFromToday = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    orderNumber: '57392',
    storeId: 'local-market',
    status: 'out_for_delivery',
    orderDate: getDateFromToday(-2),
    estimatedDelivery: getDateFromToday(0),
    totalAmount: 48.75,
    items: [
      { name: 'Chicken Breast', quantity: 2, unit: 'kg', price: 15.98, category: 'Proteins' },
      { name: 'Spinach', quantity: 0.5, unit: 'kg', price: 4.99, category: 'Vegetables' },
      { name: 'Olive Oil', quantity: 1, unit: 'L', price: 12.49, category: 'Oils & Vinegars' },
      { name: 'Rice', quantity: 2, unit: 'kg', price: 8.99, category: 'Dry Goods' },
      { name: 'Tomatoes', quantity: 1, unit: 'kg', price: 6.30, category: 'Vegetables' }
    ]
  },
  {
    id: 'ord-002',
    orderNumber: '57245',
    storeId: 'super-store',
    status: 'shipped',
    orderDate: getDateFromToday(-3),
    estimatedDelivery: getDateFromToday(2),
    totalAmount: 35.27,
    items: [
      { name: 'Milk', quantity: 3, unit: 'L', price: 9.87, category: 'Dairy & Eggs' },
      { name: 'Bread', quantity: 2, unit: 'loaf', price: 6.00, category: 'Bakery' },
      { name: 'Bananas', quantity: 1.5, unit: 'kg', price: 4.50, category: 'Fruits' },
      { name: 'Cereal', quantity: 1, unit: 'box', price: 5.99, category: 'Dry Goods' },
      { name: 'Yogurt', quantity: 6, unit: 'each', price: 8.91, category: 'Dairy & Eggs' }
    ]
  },
  {
    id: 'ord-003',
    orderNumber: '56982',
    storeId: 'fresh-foods',
    status: 'delivered',
    orderDate: getDateFromToday(-7),
    estimatedDelivery: getDateFromToday(-5),
    deliveryDate: getDateFromToday(-5),
    totalAmount: 62.33,
    items: [
      { name: 'Salmon', quantity: 1, unit: 'kg', price: 24.99, category: 'Proteins' },
      { name: 'Sweet Potatoes', quantity: 2, unit: 'kg', price: 7.98, category: 'Vegetables' },
      { name: 'Broccoli', quantity: 1, unit: 'kg', price: 4.99, category: 'Vegetables' },
      { name: 'Quinoa', quantity: 0.5, unit: 'kg', price: 8.99, category: 'Dry Goods' },
      { name: 'Bell Peppers', quantity: 0.8, unit: 'kg', price: 5.52, category: 'Vegetables' },
      { name: 'Eggs', quantity: 12, unit: 'each', price: 5.99, category: 'Dairy & Eggs' },
      { name: 'Avocados', quantity: 3, unit: 'each', price: 3.87, category: 'Fruits' }
    ]
  },
  {
    id: 'ord-004',
    orderNumber: '57458',
    storeId: 'bulk-buy',
    status: 'processing',
    orderDate: getDateFromToday(-1),
    estimatedDelivery: getDateFromToday(5),
    totalAmount: 94.65,
    items: [
      { name: 'Flour', quantity: 5, unit: 'kg', price: 15.99, category: 'Dry Goods' },
      { name: 'Sugar', quantity: 4, unit: 'kg', price: 12.96, category: 'Dry Goods' },
      { name: 'Coffee Beans', quantity: 1, unit: 'kg', price: 18.50, category: 'Beverages' },
      { name: 'Pasta', quantity: 6, unit: 'kg', price: 17.94, category: 'Dry Goods' },
      { name: 'Canned Tomatoes', quantity: 12, unit: 'cans', price: 23.88, category: 'Canned Goods' },
      { name: 'Olive Oil', quantity: 2, unit: 'L', price: 25.98, category: 'Oils & Vinegars' }
    ]
  }
];
