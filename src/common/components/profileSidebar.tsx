import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import './profileSidebar.css';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, onClose }) => {
  const { user, signIn, signOut } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Both sign in and sign up use the same logic now
    signIn({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      id: Date.now().toString()
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: ''
    });
    setErrors({});
    onClose();
  };

  const handleSignOut = () => {
    signOut();
    onClose();
  };


  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="profile-overlay" onClick={onClose} />}
      
      {/* Sidebar */}
      <div className={`profile-sidebar ${isOpen ? 'profile-sidebar-open' : ''}`}>
        <div className="profile-sidebar-content">
          {/* Header */}
          <div className="profile-header">
            <h2 className="profile-title">
              {user ? 'PROFILE' : 'SIGN IN'}
            </h2>
            <button className="profile-close-btn" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {user ? (
            /* User Profile View */
            <div className="profile-view">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  <span className="avatar-initial">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="profile-info">
                <div className="profile-field">
                  <label className="profile-label">Name</label>
                  <div className="profile-value">{user.name}</div>
                </div>

                <div className="profile-field">
                  <label className="profile-label">Email</label>
                  <div className="profile-value">{user.email}</div>
                </div>

                <div className="profile-field">
                  <label className="profile-label">Phone</label>
                  <div className="profile-value">{user.phone}</div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="profile-btn secondary" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* Sign In Form */
            <div className="profile-form-container">
              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                    placeholder="Enter your password"
                  />
                  {errors.password && <span className="form-error">{errors.password}</span>}
                </div>

                <button type="submit" className="profile-btn primary">
                  Sign In
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
