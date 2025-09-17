import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import menProducts from '../../data/menProducts.json';
import './productDetail.css';

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

export const ProductDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      const foundProduct = menProducts.products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0] || '');
        setSelectedSize(foundProduct.sizes[0] || '');
        setSelectedImage(foundProduct.image);
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

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    // In a real app, you might want to change the product image based on color
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

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size before buying');
      return;
    }
    // In a real app, this would redirect to checkout
    alert(`Buying ${quantity} ${product?.name} in ${selectedColor} color and ${selectedSize} size`);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size before adding to cart');
      return;
    }
    // In a real app, this would add to cart
    alert(`Added ${quantity} ${product?.name} to cart`);
  };

  if (!product) {
    return (
      <div className="product-detail-view">
        <Header />
        <div className="container">
          <div className="product-not-found">
            <h2>Product not found</h2>
            <button onClick={() => navigate('/men')} className="back-to-products">
              Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-detail-view">
      <Header />
      
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => navigate('/')} className="breadcrumb-link">Home</button>
          <span className="breadcrumb-separator">/</span>
          <button onClick={() => navigate('/men')} className="breadcrumb-link">Men</button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail-container">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={selectedImage} alt={product.name} />
              <div className="product-badges">
                {product.isNew && <span className="badge new">New</span>}
                {product.isBestSeller && <span className="badge bestseller">Best Seller</span>}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-pricing">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
              )}
              {product.originalPrice > product.price && (
                <span className="discount">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Color Selection */}
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

            {/* Size Selection */}
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

            {/* Quantity Selection */}
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

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            <div className="product-details">
              <h3>Product Details</h3>
              <ul>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Available Colors:</strong> {product.colors.join(', ')}</li>
                <li><strong>Available Sizes:</strong> {product.sizes.join(', ')}</li>
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
