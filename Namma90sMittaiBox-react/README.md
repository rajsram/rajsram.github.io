# Namma 90's Mittai Box - React + TypeScript Migration

A modern React + TypeScript web application for the Namma 90's Mittai Box online food ordering platform.

## 🚀 Features

- **Product Listing** - Browse sweets, savories, and beverages
- **Search Functionality** - Search products by name or description
- **Category Filtering** - Filter products by category
- **Shopping Cart** - Add/remove items and manage quantities
- **LocalStorage Persistence** - Cart persists across sessions
- **WhatsApp Integration** - Order placement via WhatsApp
- **Responsive Design** - Mobile-friendly UI
- **Modern Stack** - React 18, TypeScript, Vite, CSS3

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── ProductsSection.tsx
│   ├── ProductCard.tsx
│   ├── CartSidebar.tsx
│   ├── CheckoutModal.tsx
│   ├── Notification.tsx
│   └── *.css           # Component styles
├── hooks/              # Custom React hooks
│   ├── useCart.ts      # Cart state management
│   └── useProductFilter.ts  # Product filtering logic
├── utils/              # Utility functions
│   ├── storage.ts      # LocalStorage management
│   └── whatsapp.ts     # WhatsApp integration
├── data.ts             # Product data
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main app component
├── main.tsx            # React entry point
└── index.css           # Global styles
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd Namma90sMittaiBox-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:3000`

## 📦 Dependencies

- **react** (^18.2.0) - UI library
- **react-dom** (^18.2.0) - React DOM rendering

### Dev Dependencies
- **vite** (^4.0.0) - Build tool
- **typescript** (^5.0.0) - Type system
- **@vitejs/plugin-react** - Vite React plugin
- **@types/react** - React TypeScript types

## 🎨 Key Components

### Header
- Search bar for product search
- Cart button with item count
- Responsive navigation

### ProductsSection
- Product grid with filtering
- Filter buttons for categories
- No products message

### ProductCard
- Product emoji, name, description
- Price display
- Add to cart button
- Star rating

### CartSidebar
- Sliding cart panel
- Item list with quantity controls
- Cart totals (subtotal, delivery fee, total)
- Checkout button

### CheckoutModal
- Customer form (name, phone, address)
- Special instructions field
- Order summary
- Form validation
- WhatsApp order placement

### Notification
- Auto-dismiss toast notifications
- Success/error/info types
- Fixed position display

## 🪝 Custom Hooks

### useCart
Manages shopping cart state with localStorage persistence:
- `addToCart(product)` - Add or increment product
- `updateQuantity(productId, change)` - Update quantity
- `removeFromCart(productId)` - Remove item
- `clearCart()` - Clear entire cart

### useProductFilter
Filters products by category and search query:
- Memoized for performance
- Handles 'all' category
- Case-insensitive search

## 💾 LocalStorage

Cart data is automatically saved to localStorage under the key `namma90sCart`.

## 📱 WhatsApp Integration

When a customer completes checkout:
1. Order details are formatted as a message
2. Message is sent to the business WhatsApp number
3. Includes customer info, items, and totals
4. User is redirected to WhatsApp Web

**Configure business phone:** Edit `src/utils/whatsapp.ts` - `BUSINESS_PHONE` constant

## 🎯 Key Improvements from Vanilla JS

| Feature | Vanilla JS | React + TypeScript |
|---------|-----------|-------------------|
| State Management | Manual DOM updates | React Hooks |
| Type Safety | None | Full TypeScript |
| Component Reusability | Limited | Modular components |
| Performance | DOM manipulation | Virtual DOM |
| Development | Mixed concerns | Separation of concerns |
| Testing | Difficult | Component-based |
| Maintainability | Scattered logic | Organized structure |

## 🔄 Migration Highlights

### State Management
- Moved from global variables to React hooks
- Implemented custom `useCart` hook for cart logic
- Better separation of concerns

### Data Flow
- Parent-to-child props
- Callback functions for updates
- Unidirectional data flow

### Styling
- Component-scoped CSS files
- CSS variables for theming
- Responsive design with media queries

### Types
- Full TypeScript coverage
- Interfaces for all data structures
- Better IDE support and autocomplete

## 🎨 CSS Variables

Customize the theme by editing CSS variables in `src/index.css`:

```css
--primary-color: #ff6b35
--secondary-color: #f7931e
--text-dark: #2c3e50
--text-light: #7f8c8d
--bg-light: #f8f9fa
--border-color: #e9ecef
--success-color: #27ae60
```

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: below 768px

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚢 Deployment

Build the project for production:

```bash
npm run build
```

This generates an optimized build in the `dist/` directory.

Deploy the contents of `dist/` to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Your own web server

## 📝 Notes

- WhatsApp delivery requires the recipient to have WhatsApp Business API set up
- Cart data persists for 90 days by browser default
- Search is case-insensitive
- Delivery fee is fixed at ₹50

## 🔧 Future Enhancements

- User authentication
- Order history
- Payment integration (Razorpay, Stripe)
- Admin dashboard
- Real-time order tracking
- Email confirmation
- Multi-language support
- Dark mode

## 📄 License

[Add your license here]

## 👤 Author

[Your name/organization]
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
