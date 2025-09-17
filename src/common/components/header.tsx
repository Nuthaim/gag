import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';
import hamburg from '../../assets/hamburg.svg';
import search from '../../assets/Search.svg';
import User from '../../assets/User.svg';
import { ContactSidebar } from './contactSidebar';
import { ProfileSidebar } from './profileSidebar';
import { useUser } from '../../context/UserContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartItems] = useState(0); // TODO: Replace with actual cart context
  const { user } = useUser();

  // Check if current page should have always visible header
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const shouldShowHeader = isHomePage ? (isScrolled || isHovered) : true;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    // TODO: Navigate to cart page when implemented
    console.log('Cart clicked');
  };

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  const closeContact = () => {
    setIsContactOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const headerClass = `header ${shouldShowHeader ? 'header-scrolled' : ''}`;

  return (
    <header 
      className={headerClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="header-container">
        {/* Left side */}
        <div className="header-left">
          <div className="header-item" onClick={toggleMobileMenu}>
            <img src={hamburg} alt="Menu" className="header-svg-icon" />
            <span>Menu</span>
          </div>
          <div className="header-item">
            <img src={search} alt="Search" className="header-svg-icon" />
            <span>Search</span>
          </div>
        </div>

        {/* Navigation Menu */}
   

        {/* Center - Logo */}
        <div className="header-center">
          <h1 className="header-logo">GAG ESSENTIALS</h1>
        </div>

        {/* <nav className="header-nav">
          <a href="#" className="nav-link">New Arrivals</a>
          <a href="#" className="nav-link">Women</a>
          <a href="#" className="nav-link">Men</a>
          <a href="#" className="nav-link">Art of Living</a>
          <a href="#" className="nav-link">World of GAG</a>
        </nav> */}

        {/* Right side */}
        <div className="header-right">
          <div className="header-item" onClick={toggleContact}>
            <span>Call Us</span>
          </div>
          {/* <div className="header-item">
            <a href="/wholesale" className="nav-link">Wholesale</a>
          </div> */}
          <div className="header-item cart-item" onClick={handleCartClick}>
            <svg className="header-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="m1 1 4 4 13 0 4-4"></path>
              <path d="M5 5h14l-1 9H6L5 5z"></path>
            </svg>
            {cartItems > 0 && (
              <span className="cart-indicator">{cartItems}</span>
            )}
          </div>
          <div className="header-item" onClick={toggleProfile}>
            <img src={ User} alt="User" className="header-svg-icon" />
            {user && <span className="user-indicator">●</span>}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h2 className="mobile-menu-title">Menu</h2>
              <button className="mobile-menu-close" onClick={closeMobileMenu}>
                ✕
              </button>
            </div>
            <nav className="mobile-menu-nav">
              <a href="#" className="mobile-nav-link" onClick={closeMobileMenu}>New Arrivals</a>
              <a href="/men" className="mobile-nav-link" onClick={closeMobileMenu}>Men</a>
              <a href="/wholesale" className="mobile-nav-link" onClick={closeMobileMenu}>Wholsale Inventory</a>
              {/* <a href="#" className="mobile-nav-link" onClick={closeMobileMenu}>Art of Living</a> */}
              <a href="/world-of-gag" className="mobile-nav-link" onClick={closeMobileMenu}>World of GAG</a>
            </nav>
          </div>
        </div>
      )}

      {/* Contact Sidebar */}
      <ContactSidebar isOpen={isContactOpen} onClose={closeContact} />

      {/* Profile Sidebar */}
      <ProfileSidebar isOpen={isProfileOpen} onClose={closeProfile} />
    </header>
  );
};
