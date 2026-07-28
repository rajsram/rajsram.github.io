import React from 'react';
import { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart
}) => {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.emoji}
      </div>
      <div className="product-content">
        <div className="product-header">
          <div className="product-title">{product.name}</div>
          <span className="product-category">{product.category}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-number">{product.rating}</span>
        </div>
        <div className="product-footer">
          <div className="product-price">₹{product.price}</div>
          <button
            className="add-to-cart"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
