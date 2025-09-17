import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import { useFavorites } from '../../context/FavoritesContext';
import './favorites.css';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  description: string;
  isNew: boolean;
  isBestSeller: boolean;
}

export const FavoritesView: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useFavorites();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/men/product/${productId}`);
  };

  const handleRemoveFavorite = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    removeFromFavorites(productId);
  };

  return (
    <div className="favorites-view">
      <Header />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">My Favorites</h1>
          <p className="page-subtitle">
            {favorites.length > 0 
              ? `${favorites.length} item${favorites.length === 1 ? '' : 's'} in your favorites`
              : 'No items in your favorites yet'
            }
          </p>
        </div>
      </section>

      {/* Favorites Content */}
      <section className="favorites-section">
        <div className="container">
          {favorites.length > 0 ? (
            <>
              {/* Favorites Grid */}
              <div className="favorites-grid">
                {favorites.map((product: Product) => (
                  <div key={product.id} className="favorite-card" onClick={() => handleProductClick(product.id)}>
                    <div className="favorite-image-container">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="favorite-image"
                      />
                      <div className="favorite-badges">
                        {product.isNew && <span className="badge new">New</span>}
                        {product.isBestSeller && <span className="badge bestseller">Best Seller</span>}
                      </div>
                      <button 
                        className="remove-favorite-btn"
                        onClick={(e) => handleRemoveFavorite(e, product.id)}
                        title="Remove from favorites"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="favorite-info">
                      <h3 className="favorite-name">{product.name}</h3>
                      <div className="favorite-pricing">
                        <span className="favorite-price">{formatPrice(product.price)}</span>
                        <span className="favorite-original-price">{formatPrice(product.originalPrice)}</span>
                      </div>
                      <div className="favorite-colors">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <div 
                            key={index} 
                            className="color-dot" 
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="more-colors">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear All Button */}
              <div className="favorites-actions">
                <button 
                  className="clear-all-btn"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to remove all items from favorites?')) {
                      favorites.forEach(product => removeFromFavorites(product.id));
                    }
                  }}
                >
                  Clear All Favorites
                </button>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="empty-favorites">
              <div className="empty-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h2 className="empty-title">No Favorites Yet</h2>
              <p className="empty-description">
                Start adding items to your favorites by clicking the heart icon on any product.
              </p>
              <button 
                className="browse-btn"
                onClick={() => navigate('/men')}
              >
                Browse Products
              </button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

