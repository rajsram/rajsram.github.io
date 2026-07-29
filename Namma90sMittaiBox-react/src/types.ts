export interface Product {
  id: number;
  name: string;
  category: 'sweets' | 'savories' | 'beverages' | 'combos';
  price: number;
  description: string;
  images: string[]; // array of image filenames
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
  paymentMethod: 'upi' | 'cod';
}

export type FilterCategory = 'all' | 'sweets' | 'beverages' | 'savories' | 'combos';
