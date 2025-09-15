import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';
import hamburg from '../../assets/hamburg.svg';
import search from '../../assets/Search.svg';
import favorite from '../../assets/Favorite.svg';
import user from '../../assets/User.svg';
import { FavoritesList } from './favoritesList';
import { useFavorites } from '../../context/FavoritesContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const { favorites } = useFavorites();

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

  const toggleFavorites = () => {
    setIsFavoritesOpen(!isFavoritesOpen);
  };

  const closeFavorites = () => {
    setIsFavoritesOpen(false);
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
          <div className="header-item">
            <span>Call Us</span>
          </div>
          {/* <div className="header-item">
            <a href="/wholesale" className="nav-link">Wholesale</a>
          </div> */}
          <div className="header-item favorite-item" onClick={toggleFavorites}>
            <img src={favorite} alt="Favorite" className="header-svg-icon" />
            {favorites.length > 0 && (
              <span className="favorite-count">{favorites.length}</span>
            )}
          </div>
          <div className="header-item">
            <img src={user} alt="User" className="header-svg-icon" />
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
              <a href="#" className="mobile-nav-link" onClick={closeMobileMenu}>Art of Living</a>
              <a href="#" className="mobile-nav-link" onClick={closeMobileMenu}>World of GAG</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
