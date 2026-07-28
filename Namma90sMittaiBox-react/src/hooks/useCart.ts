import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types';
import { cartStorage } from '../utils/storage';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from storage on mount
  useEffect(() => {
    const savedCart = cartStorage.load();
    setCart(savedCart);
  }, []);

  // Save cart to storage whenever it changes
  useEffect(() => {
    cartStorage.save(cart);
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    cartStorage.clear();
  }, []);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
};
