import React from 'react';
import './Header.css';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartClick,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>🍬 Namma 90's Mittai Box</h1>
            <p>Traditional Sweets & Foods</p>
          </div>
          <div className="header-right">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <button className="search-btn">🔍</button>
            </div>
            <button className="cart-btn" onClick={onCartClick}>
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
