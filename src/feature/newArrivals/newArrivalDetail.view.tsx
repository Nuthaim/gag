import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import newArrivalsData from '../../data/newArrivals.json';
import { useFavorites } from '../../context/FavoritesContext';
import './newArrivalDetail.css';

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

interface ColorSetSelection {
  color: string;
  sets: number;
}

export const NewArrivalDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [product, setProduct] = useState<NewArrivalProduct | null>(null);
  
  // Get mode from URL params, default to retail
  const isWholesaleMode = searchParams.get('mode') === 'wholesale';
  
  // Wholesale state
  const [colorSetSelections, setColorSetSelections] = useState<ColorSetSelection[]>([]);
  
  // Retail state
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      const foundProduct = newArrivalsData.products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image);
        
        // Initialize wholesale color set selections
        const initialSelections = foundProduct.colors.map(color => ({
          color,
          sets: 0 // Start with 0, user must select minimum sets
        }));
        setColorSetSelections(initialSelections);
        
        // Initialize retail selections
        setSelectedColor(foundProduct.colors[0] || '');
        setSelectedSize(foundProduct.sizes[0] || '');
        setQuantity(1);
      }
    }
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleColorSetsChange = (color: string, change: number) => {
    setColorSetSelections(prev => prev.map(selection => {
      if (selection.color === color) {
        const newSets = selection.sets + change;
        return {
          ...selection,
          sets: Math.max(0, newSets) // Can't go below 0
        };
      }
      return selection;
    }));
  };

  const getTotalSets = () => {
    return colorSetSelections.reduce((total, selection) => total + selection.sets, 0);
  };

  const getTotalPieces = () => {
    return getTotalSets() * 4; // Each set has 4 pieces (S, M, L, XL)
  };

  const getTotalPrice = () => {
    if (!product) return 0;
    return getTotalPieces() * product.price; // Price per piece
  };

  const getTotalSavings = () => {
    if (!product) return 0;
    return getTotalPieces() * (product.originalPrice - product.price);
  };

  const canPlaceOrder = () => {
    return getTotalSets() >= (product?.minimumSets || 3);
  };

  const handlePlaceOrder = () => {
    if (!canPlaceOrder()) {
      alert(`Please select at least ${product?.minimumSets} sets total (each set includes all sizes: S, M, L, XL)`);
      return;
    }

    const selectedColors = colorSetSelections.filter(c => c.sets > 0);
    const orderSummary = {
      product: product?.name,
      colorSets: selectedColors,
      totalSets: getTotalSets(),
      totalPrice: getTotalPrice(),
      stockAvailable: product?.stockAvailable
    };

    let colorDetails = selectedColors.map(c => `${c.color}: ${c.sets} sets (${c.sets * 4} pieces)`).join('\n');
    
    alert(`Wholesale order placed successfully!\n\nProduct: ${orderSummary.product}\nColor Sets:\n${colorDetails}\nTotal Sets: ${orderSummary.totalSets}\nTotal Pieces: ${getTotalPieces()}\nTotal Amount: ${formatPrice(orderSummary.totalPrice)}\nStock Available: ${orderSummary.stockAvailable} pieces`);
  };

  const getStockStatusClass = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'stock-in';
      case 'Low Stock':
        return 'stock-low';
      case 'Out of Stock':
        return 'stock-out';
      default:
        return 'stock-in';
    }
  };

  // Retail functions
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleRetailAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size before adding to cart');
      return;
    }
    alert(`Added ${quantity} ${product?.name} (${selectedColor}, ${selectedSize}) to cart`);
  };

  const handleRetailBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size before buying');
      return;
    }
    alert(`Buying ${quantity} ${product?.name} in ${selectedColor} color and ${selectedSize} size`);
  };

  const handleWishlistClick = () => {
    if (product) {
      toggleFavorite(product);
    }
  };

  if (!product) {
    return (
      <div className="new-arrival-detail-view">
        <Header />
        <div className="container">
          <div className="loading">Loading product details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="new-arrival-detail-view">
      <Header />
      
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <span onClick={() => navigate('/new-arrivals')} className="breadcrumb-link">New Arrivals</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </nav>
        </div>
      </section>


      <div className="container">
        <div className="product-detail-container">
          {/* Product Image */}
          <div className="product-image-section">
            <div className="main-image-container">
              <img 
                src={selectedImage} 
                alt={product.name}
                className="main-image"
              />
              <div className="product-badges">
                <span className="badge new">New Arrival</span>
                {product.isBestSeller && <span className="badge bestseller">Best Seller</span>}
                {product.wholesaleDiscount && (
                  <span className="badge discount">{product.wholesaleDiscount}% OFF</span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-pricing">
              {isWholesaleMode ? (
                <>
                  <span className="wholesale-price">{formatPrice(product.price)} per piece</span>
                  <span className="original-price">{formatPrice(product.originalPrice)} per piece</span>
                  {product.wholesaleDiscount && (
                    <span className="discount-badge">{product.wholesaleDiscount}% Wholesale Discount</span>
                  )}
                </>
              ) : (
                <>
                  <span className="current-price">{formatPrice(product.price)}</span>
                  {product.originalPrice > product.price && (
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="discount">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="stock-info">
              <div className={`stock-status ${getStockStatusClass(product.inventoryStatus || 'In Stock')}`}>
                {product.inventoryStatus || 'In Stock'}
              </div>
              <div className="stock-count">
                {product.stockAvailable || 0} pieces available
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            {isWholesaleMode ? (
              <>
                {/* Wholesale: Color Sets Selection */}
                <div className="selection-group">
                  <h3 className="selection-title">Color Sets Selection</h3>
                  <p className="minimum-info">
                    Each set includes all sizes: {product.sizes.join(', ')}<br/>
                    Minimum {product.minimumSets || 3} sets required total<br/>
                    <strong>Price shown is per individual piece</strong>
                  </p>
                  
                  <div className="color-sets-container">
                    {colorSetSelections.map((selection) => (
                      <div key={selection.color} className="color-sets-item">
                        <div className="color-info">
                          <div 
                            className="color-preview" 
                            style={{ backgroundColor: selection.color }}
                          ></div>
                          <div className="color-label">{selection.color} Set</div>
                        </div>
                        <div className="sets-selector">
                          <button 
                            className="sets-btn" 
                            onClick={() => handleColorSetsChange(selection.color, -1)}
                            disabled={selection.sets <= 0}
                          >
                            -
                          </button>
                          <span className="sets-value">{selection.sets} sets</span>
                          <button 
                            className="sets-btn" 
                            onClick={() => handleColorSetsChange(selection.color, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wholesale: Order Summary */}
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>Total Sets:</span>
                    <span>{getTotalSets()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Total Pieces:</span>
                    <span>{getTotalPieces()} pieces</span>
                  </div>
                  <div className="summary-row">
                    <span>Price per Piece:</span>
                    <span>{formatPrice(product.price)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="summary-row savings">
                    <span>You Save:</span>
                    <span>{formatPrice(getTotalSavings())}</span>
                  </div>
                </div>

                {/* Wholesale: Action Buttons */}
                <div className="action-buttons">
                  <button 
                    className="place-order-btn"
                    onClick={handlePlaceOrder}
                    disabled={!canPlaceOrder()}
                  >
                    Place Wholesale Order
                  </button>
                  <button 
                    className={`wishlist-btn ${isFavorite(product.id) ? 'favorited' : ''}`}
                    onClick={handleWishlistClick}
                  >
                    {isFavorite(product.id) ? '❤️ Remove from Wishlist' : '♡ Add to Wishlist'}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Retail: Color Selection */}
                <div className="selection-group">
                  <h3 className="selection-title">Color: <span className="selected-value">{selectedColor}</span></h3>
                  <div className="color-options">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                        onClick={() => handleColorSelect(color)}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Retail: Size Selection */}
                <div className="selection-group">
                  <h3 className="selection-title">Size: <span className="selected-value">{selectedSize}</span></h3>
                  <div className="size-options">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Retail: Quantity Selection */}
                <div className="selection-group">
                  <h3 className="selection-title">Quantity</h3>
                  <div className="quantity-selector">
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Retail: Action Buttons */}
                <div className="action-buttons">
                  <button 
                    className={`favorite-btn ${isFavorite(product.id) ? 'favorited' : ''}`}
                    onClick={handleWishlistClick}
                  >
                    {isFavorite(product.id) ? '❤️ Added to Favorites' : '♡ Add to Favorites'}
                  </button>
                  
                  <button className="add-to-cart-btn" onClick={handleRetailAddToCart}>
                    Add to Cart
                  </button>
                  
                  <button className="buy-now-btn" onClick={handleRetailBuyNow}>
                    Buy Now
                  </button>
                </div>
              </>
            )}

            {/* Product Details */}
            <div className="product-details">
              <h3>Product Details</h3>
              <ul>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Arrival Date:</strong> {new Date(product.arrivalDate).toLocaleDateString()}</li>
                <li><strong>Available Colors:</strong> {product.colors.join(', ')}</li>
                <li><strong>Available Sizes:</strong> {product.sizes.join(', ')}</li>
                {isWholesaleMode && (
                  <>
                    <li><strong>Minimum Sets:</strong> {product.minimumSets || 3}</li>
                    <li><strong>Wholesale Discount:</strong> {product.wholesaleDiscount || 0}%</li>
                  </>
                )}
                <li><strong>Material:</strong> Premium Quality</li>
                <li><strong>Care Instructions:</strong> Machine wash cold, tumble dry low</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
