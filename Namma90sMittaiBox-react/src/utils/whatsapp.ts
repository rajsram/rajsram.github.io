import { CartItem, CheckoutFormData } from '../types';

const BUSINESS_PHONE = '9786146414';

export const generateWhatsAppMessage = (
  formData: CheckoutFormData,
  cart: CartItem[]
): string => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

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
  message += `*Total: ₹${total}*\n\n`;

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
