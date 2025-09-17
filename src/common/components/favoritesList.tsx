import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import './favoritesList.css';

interface FavoritesListProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ isOpen, onClose }) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

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
    onClose();
  };

  const handleRemoveFavorite = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    removeFromFavorites(productId);
  };

  if (!isOpen) return null;

  return (
    <div className="favorites-overlay" onClick={onClose}>
      <div className="favorites-list" onClick={(e) => e.stopPropagation()}>
        <div className="favorites-header">
          <h3 className="favorites-title">My Favorites</h3>
          <button className="favorites-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="favorites-content">
          {favorites.length === 0 ? (
            <div className="favorites-empty">
              <p>No favorites yet</p>
              <p className="favorites-empty-subtitle">Add some products to your favorites!</p>
            </div>
          ) : (
            <div className="favorites-items">
              {favorites.map((product) => (
                <div 
                  key={product.id} 
                  className="favorite-item"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="favorite-item-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  
                  <div className="favorite-item-info">
                    <h4 className="favorite-item-name">{product.name}</h4>
                    <div className="favorite-item-pricing">
                      <span className="favorite-item-price">{formatPrice(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className="favorite-item-original-price">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="favorite-item-colors">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <div 
                          key={index} 
                          className="favorite-color-dot" 
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="favorite-more-colors">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <button 
                    className="favorite-remove-btn"
                    onClick={(e) => handleRemoveFavorite(e, product.id)}
                    title="Remove from favorites"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {favorites.length > 0 && (
          <div className="favorites-footer">
            <button 
              className="favorites-view-all-btn"
              onClick={() => {
                navigate('/men');
                onClose();
              }}
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

