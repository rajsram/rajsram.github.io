# 🚀 Quick Start Guide

Get up and running with the Namma 90's Mittai Box React application in 5 minutes.

## Prerequisites

- **Node.js** 16 or higher
  - Download from [nodejs.org](https://nodejs.org)
  - Verify installation: `node --version` and `npm --version`

## 1️⃣ Installation

```bash
# Clone or navigate to the project
cd Namma90sMittaiBox-react

# Install dependencies
npm install

# This creates node_modules/ and installs:
# - React 18.2
# - React DOM 18.2
# - Vite 4.0
# - TypeScript 5.0
# - Supporting tools
```

## 2️⃣ Start Development Server

```bash
npm run dev
```

**Output:**
```
  VITE v4.0.0  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 3️⃣ Make Changes

### Editing Components
Example: Modify the header title
- File: `src/components/Header.tsx`
- Change: `<h1>🍬 Namma 90's Mittai Box</h1>`
- Result: Auto-refreshes in browser (Hot Module Replacement)

### Adding Products
- File: `src/data.ts`
- Add new product to the `products` array
- Automatically appears in the app

### Changing Colors
- File: `src/index.css`
- Modify CSS variables like `--primary-color`
- Affects all components using that color

### Updating WhatsApp Business Number
- File: `src/utils/whatsapp.ts`
- Change: `const BUSINESS_PHONE = '9786146414';`
- Update to your business number (without country code)

## 4️⃣ Build for Production

```bash
npm run build
```

**Output:**
```
✓ built in 2.34s
```

Creates optimized files in `dist/` folder:
- `dist/index.html` - Main HTML file
- `dist/assets/` - Bundled JavaScript and CSS

## 5️⃣ Deploy

### Option A: Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Option B: Netlify
1. Drag and drop `dist/` folder to [netlify.com](https://netlify.com)

### Option C: GitHub Pages
1. Build project: `npm run build`
2. Upload contents of `dist/` folder

### Option D: Own Server
1. Build project: `npm run build`
2. Upload `dist/` folder contents to web server
3. Ensure server serves `index.html` for all routes

## 📁 Project Structure Quick Reference

```
src/
├── App.tsx              ← Main app component
├── App.css              ← App styles
├── main.tsx             ← Entry point
├── index.css            ← Global styles + CSS variables
├── types.ts             ← TypeScript interfaces
├── data.ts              ← Product data (18 items)
│
├── components/          ← React components (6 files)
│   ├── Header.tsx       ← Search + Cart button
│   ├── ProductsSection.tsx  ← Filter + Grid
│   ├── ProductCard.tsx  ← Single product card
│   ├── CartSidebar.tsx  ← Shopping cart
│   ├── CheckoutModal.tsx ← Checkout form
│   └── Notification.tsx  ← Toast notifications
│
├── hooks/               ← Custom React hooks (2 files)
│   ├── useCart.ts       ← Cart state + localStorage
│   └── useProductFilter.ts ← Product filtering
│
└── utils/               ← Helper functions (2 files)
    ├── storage.ts       ← localStorage management
    └── whatsapp.ts      ← WhatsApp integration
```

## 🎯 Common Tasks

### Change Product Price
```typescript
// File: src/data.ts
{
  id: 1,
  name: 'Gulab Jamun',
  price: 150  // ← Change this
}
```

### Add New Product Category
1. Update `src/types.ts`:
   ```typescript
   type FilterCategory = 'all' | 'sweets' | 'savories' | 'beverages' | 'newcategory';
   ```

2. Add products to `src/data.ts`

3. Filter button automatically appears

### Customize Colors
Edit CSS variables in `src/index.css`:
```css
--primary-color: #ff6b35;       /* Orange */
--secondary-color: #f7931e;     /* Yellow */
--text-dark: #2c3e50;           /* Dark */
--success-color: #27ae60;       /* Green */
```

### Change WhatsApp Number
```typescript
// File: src/utils/whatsapp.ts
const BUSINESS_PHONE = '9786146414';  // Your number (no +91)
```

### Modify Delivery Fee
```typescript
// File: src/components/CartSidebar.tsx
const deliveryFee = cart.length > 0 ? 50 : 0;  // Change 50 to your amount
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- --port 3001
```

### Module Not Found Errors
```bash
rm -rf node_modules
npm install
```

### TypeScript Errors
- Check file has correct `.tsx` extension
- Verify imports match export names
- Hover over error for suggestions

### Cart Not Persisting
- Check browser allows localStorage
- Open DevTools → Application → Local Storage
- Look for `namma90sCart` key

### WhatsApp Not Opening
- Verify business phone number format (no +91)
- Check internet connection
- Test with a simple message first

## 📱 Testing on Mobile

### Local Network Testing
1. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access from phone: `http://YOUR_IP:3000`

### Mobile Debugging
- Chrome DevTools: Ctrl+Shift+I (Windows) or Cmd+Option+I (Mac)
- Toggle device toolbar: Ctrl+Shift+M
- Test touch interactions

## 🔒 Security Reminders

1. **Don't commit secrets**: Keep WhatsApp number in `.env` if sensitive
2. **HTTPS in production**: Always use HTTPS for deployed apps
3. **Input validation**: Form already validates phone format
4. **XSS protection**: React escapes content by default

## 📊 Performance Tips

1. **Images**: Compress product images
2. **Bundling**: Already optimized with Vite
3. **Caching**: Configure web server caching headers
4. **Minification**: Automatic in production build

## 🎓 Learning Resources

- **React Docs**: [react.dev](https://react.dev)
- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org)
- **Vite Guide**: [vitejs.dev](https://vitejs.dev)
- **CSS Tips**: [web.dev](https://web.dev)

## 💬 Need Help?

1. Check **README.md** for detailed documentation
2. Read **MIGRATION_GUIDE.md** for architecture details
3. Review component files for code examples
4. Check console for error messages

## ✨ Next Steps

After understanding the basics:

1. **Add Authentication**: User accounts and login
2. **Backend Integration**: Replace sample data with API
3. **Payment Gateway**: Integrate Razorpay or Stripe
4. **Admin Panel**: Manage products and orders
5. **Real-time Updates**: WebSocket for live orders
6. **Multi-language**: i18n for multiple languages
7. **Dark Mode**: Theme switching
8. **PWA**: Offline support

## 🎉 Happy Coding!

You now have a modern, scalable food ordering platform. Enjoy building features!
