import React, { useState } from 'react';
import './UserProfile.css';
import { FaUser, FaEnvelope, FaPhone, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const user = JSON.parse(localStorage.getItem('currentUser')) || {};

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'orders', label: 'Orders', icon: <FaShoppingBag /> },
    { id: 'wishlist', label: 'Wishlist', icon: <FaHeart /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="profile-info animate-fade-in">
            <div className="profile-header">
              <div className="profile-avatar">
                <FaUser className="avatar-icon" />
              </div>
              <h2>{user.fullName || 'User Name'}</h2>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <div className="detail-content">
                  <label>Email</label>
                  <p>{user.email || 'email@example.com'}</p>
                </div>
              </div>
              <div className="detail-item">
                <FaPhone className="detail-icon" />
                <div className="detail-content">
                  <label>Phone</label>
                  <p>{user.phoneNumber || 'Not provided'}</p>
                </div>
              </div>
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        );
      case 'orders':
        return (
          <div className="orders-section animate-fade-in">
            <h3>Recent Orders</h3>
            <div className="orders-list">
              <div className="no-orders">
                <FaShoppingBag className="empty-icon" />
                <p>No orders yet</p>
              </div>
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div className="wishlist-section animate-fade-in">
            <h3>My Wishlist</h3>
            <div className="wishlist-list">
              <div className="no-wishlist">
                <FaHeart className="empty-icon" />
                <p>Your wishlist is empty</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="settings-section animate-fade-in">
            <h3>Account Settings</h3>
            <div className="settings-list">
              <div className="setting-item">
                <label>Notifications</label>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <label>Dark Mode</label>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="user-avatar">
              <FaUser />
            </div>
            <h3>{user.fullName || 'User Name'}</h3>
          </div>
          <nav className="sidebar-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
          <button className="logout-button">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
        <div className="content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;