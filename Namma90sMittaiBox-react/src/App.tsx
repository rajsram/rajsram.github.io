import { useState, useCallback } from 'react';
import {
  Header,
  ProductsSection,
  CartSidebar,
  CheckoutModal,
  Notification
} from './components';
import { useCart, useProductFilter } from './hooks';
import { products } from './data';
import { FilterCategory, CheckoutFormData } from './types';
import { generateWhatsAppMessage, sendToWhatsApp } from './utils/whatsapp';

export default function App() {
  // Cart management
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    isVisible: false,
    type: 'success' as 'success' | 'error' | 'info'
  });

  // Filter products based on category and search
  const filteredProducts = useProductFilter(products, activeFilter, searchQuery);

  // Calculate cart count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handlers
  const handleAddToCart = useCallback((product: any) => {
    addToCart(product);
    showNotification(`${product.name} added to cart!`, 'success');
  }, [addToCart]);

  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleCartOpen = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      showNotification('Your cart is empty!', 'error');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, [cart]);

  const handleCheckoutSubmit = (formData: CheckoutFormData) => {
    try {
      const message = generateWhatsAppMessage(formData, cart);
      sendToWhatsApp(message);

      clearCart();
      setIsCheckoutOpen(false);
      showNotification('Order placed successfully! Redirecting to WhatsApp...', 'success');
    } catch (error) {
      console.error('Error placing order:', error);
      showNotification('Error placing order. Please try again.', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      message,
      isVisible: true,
      type
    });
  };

  const handleCloseNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        onCartClick={handleCartOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="main-container">
        <div className="container">
          <div className="main-content">
            <ProductsSection
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onFilterChange={setActiveFilter}
              activeFilter={activeFilter}
            />
          </div>
        </div>
      </main>

      <CartSidebar
        cart={cart}
        isOpen={isCartOpen}
        onClose={handleCartClose}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onSubmit={handleCheckoutSubmit}
      />

      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={handleCloseNotification}
        type={notification.type}
        duration={3000}
      />
    </div>
  );
}
