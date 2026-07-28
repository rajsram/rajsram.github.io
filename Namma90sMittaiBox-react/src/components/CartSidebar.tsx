import React from 'react';
import { CartItem } from '../types';
import './CartSidebar.css';

interface CartSidebarProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: number, change: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <aside className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{item.price}</div>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={onCheckout}
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        )}
        <div className="bottom-margin" />
      </aside>
    </>
  );
};
