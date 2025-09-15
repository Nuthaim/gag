import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import preOrderProducts from '../../data/preOrderProducts.json';
import './preOrder.css';

interface PreOrderProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  description: string;
  launchDate: string;
  isNew: boolean;
  isBestSeller: boolean;
  minimumSets: number;
  wholesaleDiscount: number;
}

export const PreOrderView: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<PreOrderProduct[]>(preOrderProducts.products);
  const [filteredProducts, setFilteredProducts] = useState<PreOrderProduct[]>(preOrderProducts.products);
  const [displayedProducts, setDisplayedProducts] = useState<PreOrderProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('launch-date');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'shirts', label: 'Shirts' },
    { value: 'tshirts', label: 'T-Shirts' },
    { value: 'pants', label: 'Pants' },
    { value: 'jeans', label: 'Jeans' }
  ];

  const sortOptions = [
    { value: 'launch-date', label: 'Launch Date' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'discount', label: 'Best Discount' }
  ];

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        filtered.sort((a, b) => b.wholesaleDiscount - a.wholesaleDiscount);
        break;
      default:
        // Launch date - sort by date
        filtered.sort((a, b) => new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime());
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Update displayed products when filtered products or current page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(filteredProducts.slice(0, endIndex));
  }, [filteredProducts, currentPage, itemsPerPage]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilLaunch = (dateString: string) => {
    const today = new Date();
    const launchDate = new Date(dateString);
    const diffTime = launchDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreProducts = displayedProducts.length < filteredProducts.length;

  const handleProductClick = (productId: number) => {
    navigate(`/pre-order/product/${productId}`);
  };

  return (
    <div className="pre-order-view">
      <Header />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Pre-Order Collection</h1>
          <p className="page-subtitle">Wholesale products launching soon - Book your inventory now!</p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            {/* Search */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search pre-order products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="filter-group">
              <label className="filter-label">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="products-header">
            <p className="products-count">
              {filteredProducts.length} pre-order products available
            </p>
          </div>
          
          <div className="products-grid">
            {displayedProducts.map((product) => {
              const daysUntilLaunch = getDaysUntilLaunch(product.launchDate);
              return (
                <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-badges">
                      {product.isNew && <span className="badge new">New</span>}
                      {product.isBestSeller && <span className="badge bestseller">Best Seller</span>}
                      <span className="badge discount">{product.wholesaleDiscount}% OFF</span>
                    </div>
                    <div className="launch-info">
                      <div className="launch-date">
                        <span className="launch-label">Launch:</span>
                        <span className="launch-value">{formatDate(product.launchDate)}</span>
                      </div>
                      <div className="days-until">
                        {daysUntilLaunch > 0 ? (
                          <span className="days-count">{daysUntilLaunch} days left</span>
                        ) : (
                          <span className="days-count launching">Launching Soon!</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-pricing">
                      <span className="wholesale-price">{formatPrice(product.price)}</span>
                      <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    </div>
                    <div className="wholesale-info">
                      <span className="minimum-sets">Min. {product.minimumSets} sets</span>
                      <span className="wholesale-discount">Wholesale {product.wholesaleDiscount}% off</span>
                    </div>
                    <div className="product-colors">
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
              );
            })}
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
