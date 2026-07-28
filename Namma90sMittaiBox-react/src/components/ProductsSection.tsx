import React from 'react';
import { Product, FilterCategory } from '../types';
import { ProductCard } from './ProductCard';
import './ProductsSection.css';

interface ProductsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onFilterChange: (category: FilterCategory) => void;
  activeFilter: FilterCategory;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onAddToCart,
  onFilterChange,
  activeFilter
}) => {
  const filters: FilterCategory[] = ['all', 'sweets', 'savories', 'beverages'];

  return (
    <section className="products-section">
      <div className="section-header">
        <h2>Our Menu</h2>
        <div className="filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => onFilterChange(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <p>No products found</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};
