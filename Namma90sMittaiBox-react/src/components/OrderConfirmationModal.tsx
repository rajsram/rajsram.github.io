import React, { useState } from 'react';
import './OrderConfirmationModal.css';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  amount: number;
  customerName: string;
  paymentMethod: 'upi' | 'cod';
  onConfirm: () => void;
  onCancel: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  amount,
  customerName,
  paymentMethod,
  onConfirm,
  onCancel
}) => {
  const [confirmations, setConfirmations] = useState({
    whatsappSent: false,
    paymentCompleted: false
  });

  const isAllConfirmed = confirmations.whatsappSent && confirmations.paymentCompleted;

  const handleConfirmationChange = (key: keyof typeof confirmations) => {
    setConfirmations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleConfirm = () => {
    if (isAllConfirmed) {
      // Reset confirmations for next order
      setConfirmations({
        whatsappSent: false,
        paymentCompleted: false
      });
      onConfirm();
    }
  };

  const handleCancel = () => {
    // Reset confirmations
    setConfirmations({
      whatsappSent: false,
      paymentCompleted: false
    });
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <>
      <button
        className="confirmation-overlay"
        onClick={handleCancel}
        aria-label="Close confirmation modal"
        type="button"
      />
      <div className="confirmation-modal">
        <div className="confirmation-content">
          <div className="confirmation-header">
            <h2>Complete Your Order</h2>
          </div>
          
          <div className="confirmation-message">
            <p className="instruction-text">
              Please confirm that you have completed the following steps:
            </p>

            <div className="order-details">
              <div className="detail-item">
                <span className="label">Customer:</span>
                <span className="value">{customerName}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Amount:</span>
                <span className="value amount">₹{amount}</span>
              </div>
            </div>

            <div className="confirmation-checklist">
              <div className="checklist-item">
                <input
                  type="checkbox"
                  id="whatsapp-confirm"
                  checked={confirmations.whatsappSent}
                  onChange={() => handleConfirmationChange('whatsappSent')}
                />
                <label htmlFor="whatsapp-confirm">
                  <span className="checkbox-text">
                    Order sent on WhatsApp
                  </span>
                </label>
              </div>

              {paymentMethod === 'upi' && (
                <div className="checklist-item">
                  <input
                    type="checkbox"
                    id="payment-confirm"
                    checked={confirmations.paymentCompleted}
                    onChange={() => handleConfirmationChange('paymentCompleted')}
                  />
                  <label htmlFor="payment-confirm">
                    <span className="checkbox-text">
                      Payment completed via UPI
                    </span>
                  </label>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="checklist-item">
                  <input
                    type="checkbox"
                    id="payment-confirm"
                    checked={confirmations.paymentCompleted}
                    onChange={() => handleConfirmationChange('paymentCompleted')}
                  />
                  <label htmlFor="payment-confirm">
                    <span className="checkbox-text">
                      Ready to pay Cash on Delivery
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="info-box">
              <p className="info-text">
                ℹ️ Once you confirm both steps, you can clear the cart to start a new order or continue editing.
              </p>
            </div>
          </div>

          <div className="confirmation-actions">
            <button 
              type="button" 
              className="btn-back-to-order"
              onClick={handleCancel}
            >
              ← Back to Order
            </button>
            <button 
              type="button" 
              className={`btn-confirm ${isAllConfirmed ? 'enabled' : 'disabled'}`}
              onClick={handleConfirm}
              disabled={!isAllConfirmed}
            >
              {isAllConfirmed ? '✓ Confirm & Continue' : 'Confirm both steps'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationModal;
