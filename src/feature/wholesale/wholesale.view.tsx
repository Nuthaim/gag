import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import wholesaleInventory from '../../data/wholesaleInventory.json';
import './wholesale.css';

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

export const WholesaleView: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<WholesaleProduct[]>(wholesaleInventory.products);
  const [filteredProducts, setFilteredProducts] = useState<WholesaleProduct[]>(wholesaleInventory.products);
  const [displayedProducts, setDisplayedProducts] = useState<WholesaleProduct[]>([]);
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
    { value: 'hoodies', label: 'Hoodies' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'stock-high', label: 'Stock: High to Low' },
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
      case 'stock-high':
        filtered.sort((a, b) => b.stockAvailable - a.stockAvailable);
        break;
      case 'discount':
        filtered.sort((a, b) => b.wholesaleDiscount - a.wholesaleDiscount);
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
    navigate(`/wholesale/product/${productId}`);
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

  return (
    <div className="wholesale-view">
      <Header />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Wholesale Inventory</h1>
          <p className="page-subtitle">Bulk orders for shopkeepers - Minimum 3 sets per color</p>
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
                placeholder="Search wholesale products..."
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
              {filteredProducts.length} wholesale products available
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
                    <span className="badge discount">{product.wholesaleDiscount}% OFF</span>
                  </div>
                  <div className="stock-info">
                    <div className={`stock-status ${getStockStatusClass(product.inventoryStatus)}`}>
                      {product.inventoryStatus}
                    </div>
                    <div className="stock-count">
                      {product.stockAvailable} pieces available
                    </div>
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-pricing">
                    <span className="wholesale-price">{formatPrice(product.price)} per piece</span>
                    <span className="original-price">{formatPrice(product.originalPrice)} per piece</span>
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
