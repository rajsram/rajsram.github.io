# Namma 90s Mittai - Online Food Ordering Application

A responsive ecommerce web application for ordering traditional sweets, savories, and beverages with WhatsApp integration for order placement.

## Features

### 🛍️ Product Catalog
- **18 Different Products** including:
  - Sweets (Gulab Jamun, Jalebi, Barfi, Rasmalai, Halwa, Laddu)
  - Savories (Chakli, Murukku, Chivda, Samosa, Chikali, Papad)
  - Beverages (Filter Coffee, Masala Chai, Lassi, Mango Shake, Coconut Water, Juice)
- Each product includes:
  - Product emoji/icon
  - Detailed description
  - Price information
  - Category classification

### 🔍 Search & Filter
- **Real-time Search**: Search products by name or description
- **Category Filters**: Filter by All, Sweets, Savories, and Beverages
- Instant results as you type

### 🛒 Shopping Cart
- **Add/Edit Quantities**: Easily increase or decrease item quantities
- **Remove Items**: Delete items from cart
- **Persistent Storage**: Cart data is saved in browser's localStorage
- **Live Updates**: Cart count and totals update in real-time
- **Cart Summary**: View subtotal, delivery charges, and total amount

### 📱 Order Management
- **Customer Details Form**: Collect name, phone, and delivery address
- **Special Instructions**: Add special delivery instructions
- **Order Summary**: Review items and totals before checkout
- **Form Validation**: Validates phone number (10 digits) and required fields

### 💬 WhatsApp Integration
- **Direct WhatsApp Sharing**: Send order details directly to WhatsApp
- **Auto-formatted Messages**: Beautifully formatted order details including:
  - Customer information
  - Itemized order list
  - Order totals with delivery charges
  - Special instructions
  - Thank you message
- **Easy Contact**: Opens WhatsApp Web with pre-filled message

### 📱 Responsive Design
- **Mobile-First Approach**: Works seamlessly on:
  - Desktop (1200px+)
  - Tablet (768px - 1200px)
  - Mobile (480px - 768px)
  - Small phones (< 480px)
- **Touch-Friendly**: Large buttons and easy navigation on mobile
- **Adaptive Layout**: Products grid adjusts based on screen size

### 💾 Data Persistence
- **Local Storage**: Cart persists across browser sessions
- **No Server Required**: Works completely offline

## How to Use

### 1. **Browse Products**
   - Visit the application
   - See all 18 products displayed in a responsive grid
   - Each product shows name, description, price, and category

### 2. **Search & Filter**
   - Use the search box to find products by name
   - Click filter buttons (All, Sweets, Savories, Beverages) to narrow down
   - Results update instantly

### 3. **Add to Cart**
   - Click "Add to Cart" button on any product
   - You'll see a confirmation notification
   - Cart count updates automatically

### 4. **Manage Cart**
   - Click the cart icon (🛒) in the header to open cart sidebar
   - Adjust quantities using +/- buttons
   - Remove items with the "Remove" button
   - See live calculations of subtotal and total

### 5. **Checkout**
   - Click "Checkout" button in cart sidebar
   - Fill in your details:
     - Full Name (required)
     - Mobile Number (10 digits, required)
     - Delivery Address (required)
     - Special Instructions (optional)
   - Review your order summary
   - Click "Complete Order via WhatsApp"

### 6. **Place Order via WhatsApp**
   - You'll be redirected to WhatsApp Web
   - Message will be pre-filled with your order details
   - Send the message to the restaurant
   - Your cart will be cleared automatically

## Project Structure

```
Namma90sMittaiBox/
├── index.html           # Main HTML file with structure
├── css/
│   └── style.css        # Responsive styling and layout
├── js/
│   └── app.js           # Application logic and functionality
├── images/              # Folder for product images (optional)
└── README.md            # This file
```

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Responsive design, flexbox, grid layout
- **JavaScript (ES6+)**: Application logic without dependencies
- **LocalStorage API**: Cart persistence
- **WhatsApp Web API**: Order sharing

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Key Features in Code

#### Product Management
- 18 pre-defined products with emojis for visual appeal
- Easy to add/modify products in `products` array

#### Cart Operations
- Add items (with duplicate handling)
- Update quantities
- Remove items
- Calculate totals with delivery charges

#### Form Validation
- Required field validation
- Phone number format validation (10 digits)
- User-friendly error messages

#### WhatsApp Integration
- Generates formatted order message
- Encodes special characters
- Opens WhatsApp Web with pre-filled message
- Falls back to WhatsApp if web is not available

#### Responsive Features
- Mobile-first CSS
- Flexible grid layouts
- Touch-friendly buttons and inputs
- Adaptive font sizes and spacing

## Customization Guide

### Add New Products
Edit `js/app.js` and add to the `products` array:
```javascript
{
    id: 19,
    name: 'Product Name',
    category: 'sweets|savories|beverages',
    price: 100,
    description: 'Product description',
    emoji: '🍭',
    rating: 4.5
}
```

### Change Colors
Edit `:root` variables in `css/style.css`:
```css
:root {
    --primary-color: #e74c3c;      /* Main color */
    --secondary-color: #f39c12;    /* Accent color */
    --dark-color: #2c3e50;         /* Dark text */
    --light-color: #ecf0f1;        /* Light background */
}
```

### Modify Delivery Charge
In `js/app.js`, update the delivery fee in `updateCartUI()` function:
```javascript
const deliveryFee = cart.length > 0 ? 50 : 0;  // Change 50 to desired amount
```

### Change WhatsApp Number
Modify the phone number destination in `sendToWhatsApp()` function or add a settings variable.

## Performance Considerations

- **Lightweight**: No external dependencies
- **Fast Loading**: Pure HTML/CSS/JS
- **Efficient Storage**: Uses localStorage for cart
- **Optimized Images**: Emoji-based product display
- **No API Calls**: Fully client-side operation

## Future Enhancement Ideas

1. **Product Images**: Add actual product photos
2. **Product Ratings**: Display and filter by ratings
3. **Quantity Presets**: Add preset quantity options
4. **Discount Codes**: Implement coupon system
5. **Payment Integration**: Add online payment options
6. **Admin Panel**: Product management interface
7. **Order History**: Track previous orders
8. **Customer Reviews**: Add product reviews and ratings
9. **Special Offers**: Time-based discounts
10. **Multi-language Support**: Support regional languages

## Deployment

1. Upload all files to your web server or GitHub Pages
2. Update the WhatsApp number in the code
3. Share the link with customers
4. No backend server required!

## Browser Testing

The application has been tested and is responsive on:
- ✅ Desktop browsers
- ✅ Tablet devices
- ✅ Mobile phones
- ✅ All modern browsers

## Notes

- The WhatsApp feature requires WhatsApp account
- WhatsApp Web API works in all modern browsers
- Cart data is stored locally and expires when browser data is cleared
- No sensitive data is stored on servers

## Support & Contact

For modifications or questions about the application:
- Contact the developer through the portfolio website
- Email: RajeshSivasankaran@outlook.com
- LinkedIn: linkedin.com/in/rajsram

---

Created with ❤️ for traditional food lovers!
