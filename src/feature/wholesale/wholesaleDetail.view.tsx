import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import wholesaleInventory from '../../data/wholesaleInventory.json';
import './wholesaleDetail.css';

interface WholesaleProduct {
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
  minimumSets: number;
  wholesaleDiscount: number;
  stockAvailable: number;
  inventoryStatus: string;
}

interface ColorSetSelection {
  color: string;
  sets: number;
}

export const WholesaleDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<WholesaleProduct | null>(null);
  const [colorSetSelections, setColorSetSelections] = useState<ColorSetSelection[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      const foundProduct = wholesaleInventory.products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image);
        // Initialize color set selections - each color can have sets
        const initialSelections = foundProduct.colors.map(color => ({
          color,
          sets: 0 // Start with 0, user must select minimum 3 total sets
        }));
        setColorSetSelections(initialSelections);
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

  if (!product) {
    return (
      <div className="wholesale-detail-view">
        <Header />
        <div className="container">
          <div className="loading">Loading product details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wholesale-detail-view">
      <Header />
      
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <span onClick={() => navigate('/wholesale')} className="breadcrumb-link">Wholesale Inventory</span>
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
                {product.isNew && <span className="badge new">New</span>}
                {product.isBestSeller && <span className="badge bestseller">Best Seller</span>}
                <span className="badge discount">{product.wholesaleDiscount}% OFF</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-pricing">
              <span className="wholesale-price">{formatPrice(product.price)} per piece</span>
              <span className="original-price">{formatPrice(product.originalPrice)} per piece</span>
              <span className="discount-badge">{product.wholesaleDiscount}% Wholesale Discount</span>
            </div>

            <div className="stock-info">
              <div className={`stock-status ${getStockStatusClass(product.inventoryStatus)}`}>
                {product.inventoryStatus}
              </div>
              <div className="stock-count">
                {product.stockAvailable} pieces available
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            {/* Color Sets Selection */}
            <div className="selection-group">
              <h3 className="selection-title">Color Sets Selection</h3>
              <p className="minimum-info">
                Each set includes all sizes: {product.sizes.join(', ')}<br/>
                Minimum {product.minimumSets} sets required total<br/>
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

            {/* Order Summary */}
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

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={!canPlaceOrder()}
              >
                Place Wholesale Order
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
