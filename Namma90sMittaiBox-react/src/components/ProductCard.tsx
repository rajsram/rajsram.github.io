import React, { useState } from 'react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const imagePath = `/images/${product.images[currentImageIndex]}`;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imagePath} alt={product.name} className="product-img" />
        {product.images.length > 1 && (
          <>
            <button className="slide-nav prev" onClick={handlePrevImage}>
              ❮
            </button>
            <button className="slide-nav next" onClick={handleNextImage}>
              ❯
            </button>
            <div className="image-indicators">
              {product.images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="product-content">
        <div className="product-header">
          <div className="product-title">{product.name}</div>
          <span className="product-category">{product.category}</span>
        </div>
        <p className="product-description">{product.description}</p>
        {/* <div className="product-rating">
          <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-number">{product.rating}</span>
        </div> */}
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
