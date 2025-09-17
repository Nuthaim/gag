import React from 'react';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import './worldOfGag.css';

export const WorldOfGagView: React.FC = () => {
  return (
    <div className="world-of-gag-view">
      <Header />
      
      {/* Hero Section */}
      <section className="world-hero-section">
        <div className="world-hero-overlay">
          <div className="container">
            <h1 className="world-hero-title">World of GAG</h1>
            <p className="world-hero-subtitle">Discover the craftsmanship behind every product</p>
          </div>
        </div>
      </section>

      {/* Fabrics Section */}
      <section className="fabrics-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Premium Fabrics</h2>
            <p className="section-subtitle">We source the finest materials to create exceptional products</p>
          </div>
          
          <div className="fabrics-grid">
            <div className="fabric-card">
              <div className="fabric-image">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop" alt="Cotton Fabric" />
              </div>
              <div className="fabric-info">
                <h3 className="fabric-name">Premium Cotton</h3>
                <p className="fabric-description">
                  Soft, breathable, and naturally comfortable. Our premium cotton fabrics are carefully selected for their superior quality and durability.
                </p>
                <ul className="fabric-features">
                  <li>100% Natural Fiber</li>
                  <li>Breathable & Comfortable</li>
                  <li>Easy to Care</li>
                  <li>Long-lasting Quality</li>
                </ul>
              </div>
            </div>

            <div className="fabric-card">
              <div className="fabric-image">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop" alt="Linen Fabric" />
              </div>
              <div className="fabric-info">
                <h3 className="fabric-name">Luxury Linen</h3>
                <p className="fabric-description">
                  Elegant and sophisticated, our linen fabrics offer exceptional comfort and a natural, textured appearance that gets better with time.
                </p>
                <ul className="fabric-features">
                  <li>Natural & Sustainable</li>
                  <li>Temperature Regulating</li>
                  <li>Antimicrobial Properties</li>
                  <li>Timeless Elegance</li>
                </ul>
              </div>
            </div>

            <div className="fabric-card">
              <div className="fabric-image">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop" alt="Imported Chinese Fabric" />
              </div>
              <div className="fabric-info">
                <h3 className="fabric-name">Imported Chinese Fabrics</h3>
                <p className="fabric-description">
                  Carefully curated from the finest Chinese manufacturers, these fabrics offer unique textures, patterns, and exceptional quality.
                </p>
                <ul className="fabric-features">
                  <li>Exclusive Designs</li>
                  <li>Superior Craftsmanship</li>
                  <li>Unique Textures</li>
                  <li>Premium Quality</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Unit Section */}
      <section className="production-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Production Unit</h2>
            <p className="section-subtitle">State-of-the-art facilities with traditional craftsmanship</p>
          </div>
          
          <div className="production-content">
            <div className="production-text">
              <div className="production-item">
                <h3 className="production-title">Modern Manufacturing</h3>
                <p className="production-description">
                  Our production unit combines cutting-edge technology with traditional craftsmanship. 
                  We maintain the highest standards of quality control while preserving the art of handmade excellence.
                </p>
              </div>
              
              <div className="production-item">
                <h3 className="production-title">Quality Assurance</h3>
                <p className="production-description">
                  Every product undergoes rigorous quality checks at multiple stages of production. 
                  From fabric inspection to final packaging, we ensure only the finest products reach our customers.
                </p>
              </div>
              
              <div className="production-item">
                <h3 className="production-title">Sustainable Practices</h3>
                <p className="production-description">
                  We are committed to sustainable manufacturing practices, minimizing waste and 
                  using eco-friendly processes wherever possible.
                </p>
              </div>
            </div>
            
            <div className="production-images">
              <div className="production-image">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" alt="Production Unit" />
              </div>
              <div className="production-image">
                <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop" alt="Manufacturing Process" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Manufacturing Excellence</h2>
            <p className="section-subtitle">Traditional techniques meet modern innovation</p>
          </div>
          
          <div className="process-grid">
            <div className="process-card">
              <div className="process-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="process-title">Hand Weaving</h3>
              <p className="process-description">
                Our skilled artisans use traditional hand-weaving techniques to create unique textures and patterns. 
                Each piece is carefully crafted with attention to detail and quality.
              </p>
            </div>

            <div className="process-card">
              <div className="process-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="process-title">Hand Embroidery</h3>
              <p className="process-description">
                Intricate hand embroidery adds elegance and sophistication to our products. 
                Our artisans create beautiful patterns that are both durable and visually stunning.
              </p>
            </div>

            <div className="process-card">
              <div className="process-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="process-title">Long-lasting Printing</h3>
              <p className="process-description">
                We use advanced printing techniques that ensure vibrant colors and designs that last. 
                Our printing process is designed to maintain quality through multiple washes and wear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Product Section */}
      <section className="final-product-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The Final Product</h2>
            <p className="section-subtitle">From concept to creation, every step matters</p>
          </div>
          
          <div className="final-product-content">
            <div className="product-showcase">
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop" alt="Final Product" />
              </div>
              <div className="product-info">
                <h3 className="product-title">Market-Ready Excellence</h3>
                <p className="product-description">
                  After meticulous attention to every detail - from fabric selection to hand-weaving, 
                  embroidery, and printing - we deliver products that meet the highest standards of quality and design.
                </p>
                <div className="product-features">
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">Premium Quality Materials</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">Handcrafted Excellence</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">Durable & Long-lasting</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">Unique Designs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Experience GAG Quality</h2>
            <p className="cta-subtitle">Discover our collection of premium products crafted with care and attention to detail</p>
            <div className="cta-buttons">
              <a href="/men" className="cta-btn primary">Shop Men's Collection</a>
              <a href="/wholesale" className="cta-btn secondary">Explore Wholesale</a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};
