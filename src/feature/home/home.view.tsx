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
                Pre-order Now for wholsale Inventory
              </button>
            </div>
          </div>
        </div>
      </section>

      

      {/* Navigation Section */}
      <section className="nav-section">
        <div className="container">
            <nav className="home-nav">
              <a href="#" className="home-nav-link">New Arrivals</a>
              <a href="/men" className="home-nav-link">Men</a>
              <a href="/wholesale" className="home-nav-link">Wholsale Inventory</a>

              <a href="#" className="home-nav-link">Art of Living</a>
              <a href="#" className="home-nav-link">World of GAG</a>
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
