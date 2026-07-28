import React, { useState } from 'react';
import { getUPIPaymentInfo, getUPIConfig } from '../utils/whatsapp';
import './PaymentInfo.css';

interface PaymentInfoProps {
  amount: number;
  paymentMethod: 'upi' | 'cod';
  onPaymentMethodChange: (method: 'upi' | 'cod') => void;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({
  amount,
  paymentMethod,
  onPaymentMethodChange
}) => {
  const [showQR, setShowQR] = useState(false);
  
  // Generate payment reference based on payment method
  const paymentReference = paymentMethod === 'upi' 
    ? `MITTAI${Date.now()}` 
    : `ORDER${Date.now()}`;
  
  const upiDetails = paymentMethod === 'upi' 
    ? getUPIPaymentInfo(amount, paymentReference)
    : null;

  const handleOpenUPI = () => {
    if (upiDetails) {
      window.location.href = upiDetails.upiLink;
    }
  };

  const handleToggleQR = () => {
    setShowQR(!showQR);
  };

  return (
    <div className="payment-info">
      <h3>💳 Payment Method</h3>

      <div className="payment-method-selection">
        <div className="radio-option">
          <input
            type="radio"
            id="payment-upi"
            name="paymentMethod"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={() => onPaymentMethodChange('upi')}
          />
          <label htmlFor="payment-upi">💳 UPI Payment</label>
        </div>
        <div className="radio-option">
          <input
            type="radio"
            id="payment-cod"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={() => onPaymentMethodChange('cod')}
          />
          <label htmlFor="payment-cod">💰 Cash on Delivery</label>
        </div>
      </div>

      {paymentMethod === 'upi' && (
        <div className="payment-details-section upi-section">
          <h4>UPI Payment Details</h4>
          <div className="payment-details">
            <div className="detail-item">
              <span className="detail-label">UPI ID:</span>
              <span className="detail-value">{getUPIConfig().upiId}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Amount:</span>
              <span className="detail-value amount">₹{amount}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Reference:</span>
              <span className="detail-value reference">{paymentReference}</span>
            </div>
          </div>

          <div className="upi-buttons">
            <button
              type="button"
              className="upi-app-button"
              onClick={handleOpenUPI}
              title="Open UPI app for payment"
            >
              📱 Open UPI App
            </button>
            <button
              type="button"
              className="qr-toggle-button"
              onClick={handleToggleQR}
              title="Toggle QR code visibility"
            >
              {showQR ? '📱 Hide QR' : '📲 Show QR'}
            </button>
          </div>

          {showQR && upiDetails && (
            <div className="qr-section">
              <h4>Scan QR Code to Pay</h4>
              <img
                src={upiDetails.qrCodeUrl}
                alt="UPI Payment QR Code"
                className="qr-code"
                loading="lazy"
              />
            </div>
          )}
        </div>
      )}

      {paymentMethod === 'cod' && (
        <div className="payment-details-section cod-section">
          <h4>💰 Cash on Delivery</h4>
          <div className="cod-info">
            <p>Please keep the exact change ready. Our delivery partner will collect payment at your doorstep.</p>
            <div className="amount-info">
              <span className="label">Order Reference:</span>
              <span className="reference">{paymentReference}</span>
            </div>
            <div className="amount-info">
              <span className="label">Amount to Pay:</span>
              <span className="amount">₹{amount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
