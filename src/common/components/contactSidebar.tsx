import React, { useState } from 'react';
import './contactSidebar.css';

interface ContactSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSidebar: React.FC<ContactSidebarProps> = ({ isOpen, onClose }) => {
  const [showWhatsAppScanner, setShowWhatsAppScanner] = useState(false);

  const handleWhatsAppClick = () => {
    setShowWhatsAppScanner(true);
  };

  const handleBackFromScanner = () => {
    setShowWhatsAppScanner(false);
  };

  const handleWhatsAppWebClick = () => {
    // Open WhatsApp Web
    window.open('https://web.whatsapp.com/', '_blank');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="contact-overlay" onClick={onClose} />}
      
      {/* Sidebar */}
      <div className={`contact-sidebar ${isOpen ? 'contact-sidebar-open' : ''}`}>
        <div className="contact-sidebar-content">
          {!showWhatsAppScanner ? (
            <>
              {/* Header */}
              <div className="contact-header">
                <h2 className="contact-title">CONTACT US</h2>
                <button className="contact-close-btn" onClick={onClose}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>

              {/* Contact Methods */}
              <div className="contact-methods">
                {/* Call Us */}
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <a href="tel:+18774822430" className="contact-link">Call Us +1 (877) 482-2430</a>
                    <p className="contact-hours">
                      Monday - Saturday from 9 AM to 11 PM (EST)<br/>
                      Sunday from 10 AM to 9 PM (EST)
                    </p>
                  </div>
                </div>

                {/* Live Chat */}
                <div className="contact-method">
                  <div className="contact-icon">
                    <div className="live-chat-indicator"></div>
                  </div>
                  <div className="contact-details">
                    <span className="contact-link">LIVE CHAT</span>
                    <p className="contact-hours">
                      Monday - Saturday from 9 AM to 11 PM (EST)<br/>
                      Sunday from 10 AM to 9 PM (EST)
                    </p>
                  </div>
                </div>

                {/* Message Us */}
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-link">Message Us</span>
                    <p className="contact-hours">
                      Monday - Saturday from 9 AM to 8 PM (EST)<br/>
                      Sunday from 10 AM to 7 PM (EST)
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <button className="contact-link whatsapp-link" onClick={handleWhatsAppClick}>
                      WhatsApp
                    </button>
                    <p className="contact-hours">
                      Available 24/7 for quick support
                    </p>
                  </div>
                </div>

                {/* Shop Address */}
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-link">Visit Our Store</span>
                    <p className="contact-hours">
                      123 Fashion Street<br/>
                      New York, NY 10001<br/>
                      United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Further Assistance */}
              <div className="contact-footer">
                <p className="contact-question">Do you need further assistance?</p>
                <button className="contact-footer-link" onClick={onClose}>
                  Get in Contact with Us
                </button>
              </div>
            </>
          ) : (
            <>
              {/* WhatsApp Scanner */}
              <div className="whatsapp-scanner">
                <div className="scanner-header">
                  <button className="scanner-back-btn" onClick={handleBackFromScanner}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                    </svg>
                    BACK
                  </button>
                  <button className="scanner-close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>

                <div className="scanner-content">
                  <h2 className="scanner-title">CONNECT TO WHATSAPP</h2>
                  <p className="scanner-instructions">
                    Scan the QR code with your smartphone to connect with our Client Service by mobile
                  </p>
                  
                  <div className="qr-code-container">
                    <div className="qr-code">
                      {/* QR Code placeholder - you can replace this with an actual QR code image */}
                      <div className="qr-placeholder">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                          <rect width="200" height="200" fill="white" stroke="#000" strokeWidth="2"/>
                          <rect x="20" y="20" width="40" height="40" fill="#000"/>
                          <rect x="80" y="20" width="40" height="40" fill="#000"/>
                          <rect x="140" y="20" width="40" height="40" fill="#000"/>
                          <rect x="20" y="80" width="40" height="40" fill="#000"/>
                          <rect x="80" y="80" width="40" height="40" fill="#000"/>
                          <rect x="140" y="80" width="40" height="40" fill="#000"/>
                          <rect x="20" y="140" width="40" height="40" fill="#000"/>
                          <rect x="80" y="140" width="40" height="40" fill="#000"/>
                          <rect x="140" y="140" width="40" height="40" fill="#000"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <p className="whatsapp-web-text">
                    Click below to access <button className="whatsapp-web-link" onClick={handleWhatsAppWebClick}>WhatsApp Web</button>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

