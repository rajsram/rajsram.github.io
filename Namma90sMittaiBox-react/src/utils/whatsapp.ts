import { CartItem, CheckoutFormData } from '../types';
import { BUSINESS_PHONE, UPI_CONFIG } from '../data/business';

interface UPIPaymentDetails {
  upiLink: string;
  qrCodeUrl: string;
}

// Generate UPI payment link and QR code
export const generateUPIPaymentDetails = (
  amount: number,
  transactionRef: string
): UPIPaymentDetails => {
  // Format: upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&tr=TRANSACTION_REF&tn=NOTE
  const upiLink = `upi://pay?pa=${UPI_CONFIG.upiId}&pn=${encodeURIComponent(UPI_CONFIG.payeeName)}&am=${amount}&tr=${transactionRef}&tn=Order%20Payment`;

  // Generate QR code URL using qrserver API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;

  return { upiLink, qrCodeUrl };
};

export const generateWhatsAppMessage = (
  formData: CheckoutFormData,
  cart: CartItem[],
  paymentMethod: 'upi' | 'cod' = 'upi'
): string => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  // Generate payment reference based on payment method
  const paymentReference = paymentMethod === 'upi' 
    ? `MITTAI${Date.now()}` 
    : `ORDER${Date.now()}`;

  let message = `*Namma 90's Mittai Box - Order Details*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${formData.name}\n`;
  message += `Phone: ${formData.phone}\n`;
  message += `Address: ${formData.address}\n\n`;

  message += `*Order Items:*\n`;
  cart.forEach(item => {
    message += `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
  });

  message += `\n*Order Summary:*\n`;
  message += `Subtotal: ₹${subtotal}\n`;
  message += `Delivery: ₹${deliveryFee}\n`;
  message += `*Total Amount to Pay: ₹${total}*\n\n`;

  // Payment Details based on method
  if (paymentMethod === 'upi') {
    message += `*Payment Method: UPI*\n`;
    message += `UPI Payment Reference: ${paymentReference}\n\n`;
  } else {
    message += `*Payment Method: Cash on Delivery*\n`;
    message += `Order Reference: ${paymentReference}\n\n`;
  }

  if (formData.instructions) {
    message += `*Special Instructions:*\n${formData.instructions}\n\n`;
  }

  message += `Thank you for ordering from Namma 90's Mittai Box!`;

  return message;
};

export const sendToWhatsApp = (message: string): void => {
  const whatsappUrl = `https://wa.me/91${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

// Open UPI payment directly
export const openUPIPayment = (amount: number, transactionRef: string): void => {
  const upiDetails = generateUPIPaymentDetails(amount, transactionRef);
  window.location.href = upiDetails.upiLink;
};

// Get UPI configuration
export const getUPIConfig = () => UPI_CONFIG;

// Export UPI details for use in components
export const getUPIPaymentInfo = (amount: number, transactionRef: string) => {
  return generateUPIPaymentDetails(amount, transactionRef);
};
