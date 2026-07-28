// Product Data
const products = [
    // Sweets
    {
        id: 1,
        name: 'Gulab Jamun',
        category: 'sweets',
        price: 150,
        description: 'Soft and sweet milk solids fried and soaked in sugar syrup',
        emoji: '🍭',
        rating: 4.5
    },
    {
        id: 2,
        name: 'Jalebi',
        category: 'sweets',
        price: 120,
        description: 'Crispy and sweet spirals with a tangy twist',
        emoji: '🔶',
        rating: 4.3
    },
    {
        id: 3,
        name: 'Barfi',
        category: 'sweets',
        price: 180,
        description: 'Rich fudgy sweet with nuts and aromatic flavors',
        emoji: '🟫',
        rating: 4.6
    },
    {
        id: 4,
        name: 'Rasmalai',
        category: 'sweets',
        price: 200,
        description: 'Soft cottage cheese dumplings in creamy milk syrup',
        emoji: '🤍',
        rating: 4.7
    },
    {
        id: 5,
        name: 'Halwa',
        category: 'sweets',
        price: 160,
        description: 'Rich and creamy wheat pudding with ghee and nuts',
        emoji: '🟤',
        rating: 4.5
    },
    {
        id: 6,
        name: 'Laddu',
        category: 'sweets',
        price: 140,
        description: 'Sweet round balls with gram flour and ghee',
        emoji: '🟡',
        rating: 4.4
    },
    
    // Savories
    {
        id: 7,
        name: 'Chakli',
        category: 'savories',
        price: 100,
        description: 'Spiral-shaped savory snack with spices',
        emoji: '🌀',
        rating: 4.2
    },
    {
        id: 8,
        name: 'Murukku',
        category: 'savories',
        price: 90,
        description: 'Crunchy rice flour and urad flour snack',
        emoji: '🌪️',
        rating: 4.1
    },
    {
        id: 9,
        name: 'Chivda',
        category: 'savories',
        price: 110,
        description: 'Mixed savory mix with nuts and spices',
        emoji: '🥜',
        rating: 4.3
    },
    {
        id: 10,
        name: 'Samosa',
        category: 'savories',
        price: 80,
        description: 'Crispy pastry filled with spiced potato and peas',
        emoji: '🔺',
        rating: 4.4
    },
    {
        id: 11,
        name: 'Chikali',
        category: 'savories',
        price: 95,
        description: 'Soft bread rolls with savory filling',
        emoji: '🥖',
        rating: 4.2
    },
    {
        id: 12,
        name: 'Papad',
        category: 'savories',
        price: 60,
        description: 'Thin and crispy lentil wafers',
        emoji: '📄',
        rating: 4.0
    },
    
    // Beverages
    {
        id: 13,
        name: 'Filter Coffee',
        category: 'beverages',
        price: 50,
        description: 'Strong traditional South Indian filter coffee',
        emoji: '☕',
        rating: 4.6
    },
    {
        id: 14,
        name: 'Masala Chai',
        category: 'beverages',
        price: 40,
        description: 'Aromatic tea with spices and milk',
        emoji: '🍵',
        rating: 4.5
    },
    {
        id: 15,
        name: 'Lassi',
        category: 'beverages',
        price: 60,
        description: 'Refreshing yogurt-based drink with fruits',
        emoji: '🥛',
        rating: 4.4
    },
    {
        id: 16,
        name: 'Mango Shake',
        category: 'beverages',
        price: 80,
        description: 'Creamy mango beverage with ice cream',
        emoji: '🥤',
        rating: 4.7
    },
    {
        id: 17,
        name: 'Coconut Water',
        category: 'beverages',
        price: 70,
        description: 'Fresh and natural coconut water',
        emoji: '🥥',
        rating: 4.3
    },
    {
        id: 18,
        name: 'Juice',
        category: 'beverages',
        price: 75,
        description: 'Fresh mixed fruit juice',
        emoji: '🧃',
        rating: 4.4
    }
];

// Cart Array
let cart = [];

// Current Filter
let currentFilter = 'all';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupSearchListener();
    loadCartFromStorage();
    updateCartUI();
});

// Render Products
function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                ${product.emoji}
            </div>
            <div class="product-content">
                <div class="product-header">
                    <div class="product-title">${product.name}</div>
                    <span class="product-category">${product.category}</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">₹${product.price}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter products
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Search Setup
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    
    // Show feedback
    showNotification(`${product.name} added to cart!`);
}

// Update Cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotal = document.getElementById('subtotal');
    const total = document.getElementById('total');
    
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
    }
    
    // Update totals
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 50 : 0;
    const totalAmount = subtotalAmount + deliveryFee;
    
    subtotal.textContent = `₹${subtotalAmount}`;
    document.getElementById('delivery').textContent = `₹${deliveryFee}`;
    total.textContent = `₹${totalAmount}`;
    
    // Enable/disable checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.disabled = cart.length === 0;
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCartToStorage();
            updateCartUI();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
    showNotification('Item removed from cart');
}

// Toggle Cart Sidebar
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

// Cart Storage
function saveCartToStorage() {
    localStorage.setItem('namma90sCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const stored = localStorage.getItem('namma90sCart');
    if (stored) {
        cart = JSON.parse(stored);
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Populate order summary in modal
    const orderItems = document.getElementById('orderItems');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        </div>
    `).join('');
    
    const totalAmount = subtotal + 50;
    document.getElementById('orderTotal').textContent = `₹${totalAmount}`;
    
    // Open modal
    openModal();
}

// Modal Functions
function openModal() {
    document.getElementById('checkoutModal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.getElementById('cartSidebar').classList.remove('active');
    
    // Prevent body scroll on mobile
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    
    // Scroll to top of modal on mobile
    setTimeout(() => {
        const modal = document.getElementById('checkoutModal');
        modal.scrollTop = 0;
        window.scrollTo(0, 0);
        // Focus on first form field
        const firstInput = document.querySelector('.checkout-form input');
        if (firstInput) firstInput.focus();
    }, 50);
}

function closeModal() {
    document.getElementById('checkoutModal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    
    // Re-enable body scroll
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
    
    // Clear form
    document.getElementById('checkoutForm').reset();
}

// Handle Checkout Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkoutForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const instructions = document.getElementById('instructions').value.trim();
            
            if (!name || !phone || !address) {
                alert('Please fill all required fields');
                return;
            }
            
            // Validate phone number
            if (phone.length !== 10 || isNaN(phone)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Generate WhatsApp message
            const whatsappMessage = generateWhatsAppMessage(name, address, instructions);
            
            // Send to WhatsApp
            sendToWhatsApp(whatsappMessage);
            
            // Clear cart and close modal
            cart = [];
            saveCartToStorage();
            updateCartUI();
            closeModal();
            
            showNotification('Order placed successfully! Redirecting to WhatsApp...');
        });
    }
});

// Generate WhatsApp Message
function generateWhatsAppMessage(name, address, instructions) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 50;
    
    let message = `*Namma 90's Mittai Box - Order Details*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${document.getElementById('phone').value.trim()}\n`;
    message += `Address: ${address}\n\n`;
    
    message += `*Order Items:*\n`;
    cart.forEach(item => {
        message += `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    
    message += `\n*Order Summary:*\n`;
    message += `Subtotal: ₹${subtotal}\n`;
    message += `Delivery: ₹50\n`;
    message += `*Total: ₹${total}*\n\n`;
    
    if (instructions) {
        message += `*Special Instructions:*\n${instructions}\n\n`;
    }
    
    message += `Thank you for ordering from Namma 90's Mittai Box!`;
    
    return message;
}

// Send to WhatsApp
function sendToWhatsApp(message) {
    const phone = '9786146414'; // Replace with your business number
    // WhatsApp Web API format
    const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Show Notification
function showNotification(message) {
    // Simple notification (can be enhanced with toast)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
