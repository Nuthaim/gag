import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import newArrivalsData from '../../data/newArrivals.json';
import { useFavorites } from '../../context/FavoritesContext';
import './newArrivals.css';

interface NewArrivalProduct {
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
  arrivalDate: string;
  minimumSets?: number;
  wholesaleDiscount?: number;
  stockAvailable?: number;
  inventoryStatus?: string;
}

export const NewArrivalsView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [products] = useState<NewArrivalProduct[]>(newArrivalsData.products);
  
  // Get initial mode from URL params, default to retail
  const initialMode = searchParams.get('mode') === 'wholesale';
  const [isWholesaleMode, setIsWholesaleMode] = useState(initialMode);
  const [selectedSets, setSelectedSets] = useState<{ [key: number]: number }>({});
  
  // View more state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Show 6 products per page

  // Sync local state with URL params when component mounts or URL changes
  useEffect(() => {
    const urlMode = searchParams.get('mode') === 'wholesale';
    // Only update if URL has a mode parameter and it's different from current state
    if (searchParams.has('mode') && urlMode !== isWholesaleMode) {
      setIsWholesaleMode(urlMode);
    }
  }, [searchParams]); // Removed isWholesaleMode from dependencies to prevent infinite loop

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getWholesalePrice = (product: NewArrivalProduct) => {
    if (!product.wholesaleDiscount) return product.price;
    return Math.round(product.price * (1 - product.wholesaleDiscount / 100));
  };

  const handleProductClick = (productId: number) => {
    const mode = isWholesaleMode ? 'wholesale' : 'retail';
    navigate(`/new-arrivals/product/${productId}?mode=${mode}`);
  };

  const handleWishlistClick = (e: React.MouseEvent, product: NewArrivalProduct) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleSetChange = (productId: number, sets: number) => {
    setSelectedSets(prev => ({
      ...prev,
      [productId]: sets
    }));
  };

  const handleAddToCart = (e: React.MouseEvent, product: NewArrivalProduct) => {
    e.stopPropagation();
    
    if (isWholesaleMode) {
      const sets = selectedSets[product.id] || product.minimumSets || 1;
      if (sets < (product.minimumSets || 1)) {
        alert(`Minimum ${product.minimumSets || 1} sets required for wholesale`);
        return;
      }
      // Handle wholesale add to cart logic
      console.log(`Added ${sets} sets of ${product.name} to wholesale cart`);
    } else {
      // Handle retail add to cart logic
      console.log(`Added ${product.name} to retail cart`);
    }
  };

  const handleModeToggle = (wholesale: boolean) => {
    setIsWholesaleMode(wholesale);
    setSelectedSets({}); // Reset selected sets when switching modes
    setCurrentPage(1); // Reset to first page when switching modes
    
    // Update URL params to preserve mode when navigating to detail page
    const newMode = wholesale ? 'wholesale' : 'retail';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('mode', newMode);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
  };

  // View more logic (like men's page)
  const endIndex = currentPage * itemsPerPage;
  const displayedProducts = products.slice(0, endIndex);
  const hasMoreProducts = displayedProducts.length < products.length;

  const handleViewMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="new-arrivals-view">
      <Header />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">New Arrivals</h1>
          <p className="page-subtitle">Discover our latest collection of premium products</p>
          
          {/* Wholesale/Retail Toggle */}
          <div className="mode-toggle-container">
            <div className="mode-toggle">
              <button 
                className={`toggle-btn ${!isWholesaleMode ? 'active' : ''}`}
                onClick={() => handleModeToggle(false)}
              >
                Retail
              </button>
              <button 
                className={`toggle-btn ${isWholesaleMode ? 'active' : ''}`}
                onClick={() => handleModeToggle(true)}
              >
                Wholesale
              </button>
            </div>
            <div className="mode-info">
              {isWholesaleMode ? (
                <p className="mode-description">
                  Wholesale pricing available • Minimum sets required • Bulk discounts applied
                </p>
              ) : (
                <p className="mode-description">
                  Individual purchase • Standard retail pricing • Add to cart for immediate purchase
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="new-arrivals-section">
        <div className="container">
          <div className="arrivals-grid">
            {displayedProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={`arrival-card ${index % 3 === 0 ? 'featured' : ''}`}
                onClick={() => handleProductClick(product.id)}
              >
                <div className="arrival-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="arrival-image"
                  />
                  <div className="arrival-badges">
                    <span className="badge new">New Arrival</span>
                    {product.isBestSeller && <span className="badge bestseller">Best Seller</span>}
                    {isWholesaleMode && product.wholesaleDiscount && (
                      <span className="badge discount">{product.wholesaleDiscount}% Off</span>
                    )}
                  </div>
                  <button 
                    className={`wishlist-btn ${isFavorite(product.id) ? 'favorited' : ''}`}
                    onClick={(e) => handleWishlistClick(e, product)}
                  >
                    {isFavorite(product.id) ? '❤️' : '♡'}
                  </button>
                </div>
                
                <div className="arrival-info">
                  <h3 className="arrival-name">{product.name}</h3>
                  <p className="arrival-description">{product.description}</p>
                  
                  <div className="arrival-pricing">
                    {isWholesaleMode && product.wholesaleDiscount ? (
                      <div className="wholesale-pricing">
                        <span className="wholesale-price">{formatPrice(getWholesalePrice(product))}</span>
                        <span className="retail-price">Retail: {formatPrice(product.price)}</span>
                        <span className="savings">Save {formatPrice(product.price - getWholesalePrice(product))}</span>
                      </div>
                    ) : (
                      <div className="retail-pricing">
                        <span className="current-price">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <span className="original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="arrival-colors">
                    {product.colors.slice(0, 4).map((color, colorIndex) => (
                      <div 
                        key={colorIndex} 
                        className="color-dot" 
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="more-colors">+{product.colors.length - 4}</span>
                    )}
                  </div>

                  {isWholesaleMode && (
                    <div className="wholesale-controls">
                      <div className="sets-selector">
                        <label>Sets:</label>
                        <select 
                          value={selectedSets[product.id] || product.minimumSets || 1}
                          onChange={(e) => handleSetChange(product.id, parseInt(e.target.value))}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div className="stock-info">
                        <span className="stock-status">{product.inventoryStatus}</span>
                        <span className="stock-count">{product.stockAvailable} available</span>
                      </div>
                    </div>
                  )}

                  <button 
                    className={`add-to-cart-btn ${isWholesaleMode ? 'wholesale' : 'retail'}`}
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    {isWholesaleMode ? 'Add Sets to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {hasMoreProducts && (
            <div className="view-more-container">
              <button className="view-more-btn" onClick={handleViewMore}>
                View More Products
              </button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};
