import React from 'react';
import './OrderCompleteModal.css';

interface OrderCompleteModalProps {
  isOpen: boolean;
  customerName: string;
  onClose: () => void;
}

export const OrderCompleteModal: React.FC<OrderCompleteModalProps> = ({
  isOpen,
  customerName,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <>
      <button
        className="complete-overlay"
        onClick={onClose}
        aria-label="Close order complete modal"
      />
      <div className="complete-modal">
        <div className="complete-content">
          <div className="complete-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p className="customer-greeting">Hi {customerName},</p>
          <p className="complete-message">
            Your order has been successfully placed and sent on WhatsApp.
          </p>
          <div className="contact-info">
            <p className="contact-label">Our team will contact you soon!</p>
            <p className="contact-details">
              We'll reach out to confirm your order details and delivery time.
            </p>
          </div>
          <button className="btn-close" onClick={onClose}>
            Got it! 👍
          </button>
        </div>
      </div>
    </>
  );
};
