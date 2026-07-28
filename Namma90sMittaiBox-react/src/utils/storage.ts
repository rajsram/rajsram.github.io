import { CartItem } from '../types';

const CART_STORAGE_KEY = 'namma90sCart';

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
