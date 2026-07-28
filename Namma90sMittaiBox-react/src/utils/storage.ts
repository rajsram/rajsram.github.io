import { CartItem, CheckoutFormData } from '../types';

const CART_STORAGE_KEY = 'namma90sCart';
const CUSTOMER_DETAILS_KEY = 'namma90sCustomerDetails';

export const cartStorage = {
  save: (cart: CartItem[]): void => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  },

  load: (): CartItem[] => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load cart:', error);
      return [];
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }
};

export const customerDetailsStorage = {
  save: (details: CheckoutFormData): void => {
    try {
      localStorage.setItem(CUSTOMER_DETAILS_KEY, JSON.stringify(details));
    } catch (error) {
      console.error('Failed to save customer details:', error);
    }
  },

  load: (): CheckoutFormData | null => {
    try {
      const stored = localStorage.getItem(CUSTOMER_DETAILS_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load customer details:', error);
      return null;
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(CUSTOMER_DETAILS_KEY);
    } catch (error) {
      console.error('Failed to clear customer details:', error);
    }
  }
};
