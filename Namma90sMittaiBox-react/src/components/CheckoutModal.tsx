import React, { useState } from 'react';
import { CartItem, CheckoutFormData } from '../types';
import './CheckoutModal.css';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onSubmit: (formData: CheckoutFormData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onSubmit
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    phone: '',
    address: '',
    instructions: ''
  });
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
    setFormData({
      name: '',
      phone: '',
      address: '',
      instructions: ''
    });
    setErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Order Details</h2>
            <button className="modal-close-btn" onClick={onClose}>✕</button>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Customer Information</h3>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Mobile Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Delivery Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter your complete delivery address"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="instructions">Special Instructions (Optional)</label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special instructions or dietary preferences?"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Order Summary</h3>
              <div className="order-items">
                {cart.map(item => (
                  <div key={item.id} className="order-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-summary">
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
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Place Order via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
