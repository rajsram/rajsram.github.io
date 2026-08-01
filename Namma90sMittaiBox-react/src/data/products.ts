import { Product } from '../types';

export const products: Product[] = [
  // Sweets
  {
    id: 1,
    name: 'Dry Jamun [250g]',
    category: 'sweets',
    price: 149,
    description: 'Soft, delicious dry jamuns with a rich and authentic taste.',
    images: ['dry-jamun/IMG_1.png', 'dry-jamun/IMG_2.png'],
    rating: 4.7
  },
  {
    id: 2,
    name: 'Ghee Laddu [250g]',
    category: 'sweets',
    price: 159,
    description: 'Freshly handcrafted with pure ghee, offering a rich, traditional taste in every bite.',
    images: ['laddu/IMG_1.png', 'laddu/IMG_2.png'],
    rating: 4.6
  },
  {
    id: 3,
    name: 'Coconut Burfi [250g]',
    category: 'sweets',
    price: 119,
    description: 'Fresh homemade coconut burfi with a rich traditional flavour.',
    images: ['coconut-burfi/IMG_1.png', 'coconut-burfi/IMG_2.png'],
    rating: 4.6
  },
  {
    id: 4,
    name: 'Pori Urundai [4 pieces]',
    category: 'sweets',
    price: 89,
    description: 'Crunchy and traditional pori urundai',
    images: ['pori-urundai/IMG_1.png', 'pori-urundai/IMG_2.png'],
    rating: 4.7
  },

  // Beverages
  {
    id: 5,
    name: 'Rose Milk [200ml]',
    category: 'beverages',
    price: 69,
    description: 'Creamy, refreshing rose milk with a rich and delightful flavour.',
    images: ['rose-milk/IMG_1.png', 'rose-milk/IMG_2.png'],
    rating: 4.6
  },

  // combos
  {
    id: 6,
    name: 'Combo Box',
    category: 'combos',
    price: 189,
    description: 'A delightful assortment of our finest sweets, perfect for sharing and gifting.',
    images: ['combo/IMG_1.png', 'combo/IMG_2.png'],
    rating: 4.8
  },
  {
    id: 7,
    name: 'Combo Box (without Rose Milk)',
    category: 'combos',
    price: 129,
    description: 'A delightful assortment of our finest sweets, perfect for sharing and gifting.',
    images: ['combo/IMG_1.png', 'combo/IMG_2.png'],
    rating: 4.7
  }

  // Savories
];
