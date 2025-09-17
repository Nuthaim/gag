import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import bannerImage from '../../assets/banner.webp';
import './home.css';

export const HomeView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-view">
      <Header />
      
      {/* Pre-Order Button Above Banner */}
   
      
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="hero-image">
          <img 
            src={bannerImage} 
            alt="Hero Banner" 
            className="hero-img"
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">GAG Travels With Grace</h1>
              <button 
                className="hero-link"
                onClick={() => navigate('/pre-order')}
              >
                Pre-order Now for Wholesale Inventory
              </button>
            </div>
          </div>
        </div>
      </section>

      

      {/* Navigation Section */}
      <section className="nav-section">
        <div className="container">
            <nav className="home-nav">
              <a href="/new-arrivals" className="home-nav-link">New Arrivals</a>
              <a href="/men" className="home-nav-link">Men</a>
              <a href="/wholesale" className="home-nav-link">Wholesale Inventory</a>

              {/* <a href="#" className="home-nav-link">Art of Living</a> */}
              <a href="/world-of-gag" className="home-nav-link">World of GAG</a>
            </nav>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Collections</h2>
          <div className="collections-grid">
            <div className="collection-item">
              <div className="collection-image">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Collection 1" />
                <div className="collection-overlay">
                  <a href="#" className="collection-link">Explore Collection</a>
                </div>
              </div>
              <h3 className="collection-title">Spring Essentials</h3>
              <p className="collection-description">Discover our latest spring collection</p>
            </div>
            <div className="collection-item">
              <div className="collection-image">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Collection 2" />
                <div className="collection-overlay">
                  <a href="#" className="collection-link">Explore Collection</a>
                </div>
              </div>
              <h3 className="collection-title">Luxury Collection</h3>
              <p className="collection-description">Premium accessories for every occasion</p>
            </div>
            <div className="collection-item">
              <div className="collection-image">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Collection 3" />
                <div className="collection-overlay">
                  <a href="#" className="collection-link">Explore Collection</a>
                </div>
              </div>
              <h3 className="collection-title">Travel Collection</h3>
              <p className="collection-description">Elegant travel essentials</p>
            </div>
          </div>
        </div>
      </section>



          {/* Wholesale Platform Section */}
          <section className="wholesale-platform-section">
        <div className="wholesale-platform-container">
          <div className="wholesale-video-section">
            <div className="video-container">
              <div className="video-placeholder">
                <div className="video-overlay">
                  <div className="video-controls">
                    <button className="video-control-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                    <button className="video-control-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="video-thumbnail">
                  <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Wholesale Platform" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="wholesale-content-section">
            <div className="wholesale-content">
              <h2 className="wholesale-title">THE GAG WHOLESALE PLATFORM</h2>
              <p className="wholesale-description">
                A comprehensive wholesale solution for shopkeepers, both online and offline. 
                Access our inventory management system and pre-order upcoming collections with 
                exclusive wholesale pricing and dedicated support for your business growth.
              </p>
              <div className="wholesale-actions">
                <button 
                  className="wholesale-btn primary"
                  onClick={() => navigate('/wholesale')}
                >
                  Explore Inventory
                </button>
                <button 
                  className="wholesale-btn secondary"
                  onClick={() => navigate('/pre-order')}
                >
                  Pre-Order Now
                </button>
              </div>
              <div className="wholesale-features">
                <div className="feature-item">
                  <span className="feature-icon">📦</span>
                  <span className="feature-text">Bulk Ordering</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💰</span>
                  <span className="feature-text">Wholesale Pricing</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🚚</span>
                  <span className="feature-text">Fast Delivery</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <span className="feature-text">Online Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="showcase-section">
        <div className="showcase-item">
          <div className="showcase-image">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Showcase" />
          </div>
          <div className="showcase-content">
            <h2 className="showcase-title">Craftsmanship Meets Innovation</h2>
            <p className="showcase-description">
              Experience the perfect blend of traditional craftsmanship and modern innovation. 
              Each piece is carefully crafted to meet the highest standards of quality and design.
            </p>
            <a href="#" className="showcase-link">Learn More</a>
          </div>
        </div>
      </section>

  

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-description">Subscribe to our newsletter for the latest updates and exclusive offers</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
