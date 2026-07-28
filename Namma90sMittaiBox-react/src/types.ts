export interface Product {
  id: number;
  name: string;
  category: 'sweets' | 'savories' | 'beverages';
  price: number;
  description: string;
  emoji: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  instructions: string;
}

export type FilterCategory = 'all' | 'sweets' | 'savories' | 'beverages';
