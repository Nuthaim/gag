import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import menProducts from '../../data/menProducts.json';
import './men.css';

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

export const MenView: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(menProducts.products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(menProducts.products);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'shirts', label: 'Shirts' },
    { value: 'tshirts', label: 'T-Shirts' },
    { value: 'pants', label: 'Pants' },
    { value: 'jeans', label: 'Jeans' },
    { value: 'shoes', label: 'Shoes' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'bestseller', label: 'Best Sellers' }
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
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'bestseller':
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      default:
        // Featured - keep original order
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

  const handleViewMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreProducts = displayedProducts.length < filteredProducts.length;

  const handleProductClick = (productId: number) => {
    navigate(`/men/product/${productId}`);
  };


  return (
    <div className="men-view">
      <Header />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Men's Collection</h1>
          <p className="page-subtitle">Discover our latest men's fashion</p>
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
                placeholder="Search products..."
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
              {filteredProducts.length} products found
            </p>
          </div>
          
          <div className="products-grid">
            {displayedProducts.map((product) => (
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
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-pricing">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    )}
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
