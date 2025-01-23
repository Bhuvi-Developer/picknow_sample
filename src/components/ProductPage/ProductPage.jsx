import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import CartPage from '../CartPage/CartPage';
import ProductDetail from './ProductDetail';
import './ProductPage.css';
import Nuts from '../../assets/Nuts.jpg';
import honey from '../../assets/honey.jpg';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState('listing');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const [addedProducts, setAddedProducts] = useState({});
  const [priceRange, setPriceRange] = useState([49, 1000]);
  const [selectedSizes, setSelectedSizes] = useState(['100 G', '200 G']);
  const [selectedRating, setSelectedRating] = useState(null);

  // Load cart from local storage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update local storage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const products = [
    {
      id: 1,
      name: 'Badam/பாதாம்',
      weight: '100g',
      price: 99,
      originalPrice: 120,
      image: Nuts,
      rating: 4.5,
      category: 'Dry fruits',
      description: 'Premium quality almonds, rich in nutrients.',
    },
    {
      id: 2,
      name: 'Black Raisin/பாதாம்',
      weight: '100g',
      price: 99,
      originalPrice: 120,
      image: Nuts,
      rating: 4.4,
      category: 'Dry fruits',
      description: 'Premium quality black raisins.',
    },
    {
      id: 3,
      name: 'Cashew/பாதாம்',
      weight: '100g',
      price: 99,
      originalPrice: 120,
      image: Nuts,
      rating: 4.6,
      category: 'Dry fruits',
      description: 'Premium quality cashews.',
    },
    {
      id: 4,
      name: 'Dry dates/பாதாம்',
      weight: '100g',
      price: 99,
      originalPrice: 120,
      image: Nuts,
      rating: 4.5,
      category: 'Dry fruits',
      description: 'Premium quality dry dates.',
    },
    {
      id: 5,
      name: 'Dry fig/பாதாம்',
      weight: '100g',
      price: 99,
      originalPrice: 120,
      image: Nuts,
      rating: 4.5,
      category: 'Dry fruits',
      description: 'Premium quality dry figs.',
    },
    {
      id: 6,
      name: 'Dry Amla/பாதாம்',
      weight: '100g',
      price: 99,
      originalPrice: 120,
      image: Nuts,
      rating: 4.5,
      category: 'Dry fruits',
      description: 'Premium quality dry amla.',
    },
  ];

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );

      if (!prevCart.find(item => item.id === product.id)) {
        updatedCart.push({ ...product, quantity });
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Update cart count
      const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem('cartCount', totalItems);

      // Dispatch custom event to notify navbar
      window.dispatchEvent(new CustomEvent('cartUpdated', { 
        detail: { count: totalItems }
      }));

      return updatedCart;
    });
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // Prevent quantity from going below 1
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const navigateBack = () => {
    setCurrentPage('listing');
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('detail');
  };

  const handleBackToListing = () => {
    setCurrentPage('listing');
    setSelectedProductId(null);
  };

  if (currentPage === 'cart') {
    return (
      <CartPage
        cart={cart}
        updateQuantity={updateQuantity}
        navigateBack={navigateBack}
      />
    );
  }

  if (currentPage === 'detail') {
    const selectedProduct = products.find(p => p.id === selectedProductId);
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={handleBackToListing}
        onAddToCart={addToCart}
      />
    );
  }

  return (
    <div className="best-selling">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="background-text">PickNow</div>
        <div className="background-text">PickNow</div>
        <div className="background-text">PickNow</div>
        <div className="floating-circle circle-1" />
        <div className="floating-circle circle-2" />
        <div className="floating-circle circle-3" />
      </div>

      <div className="product-layout">
        {/* Filter Sidebar */}
        <div className="filter-sidebar">
          <div className="filter-section">
            <h3>Filter By Price</h3>
            <div className="price-range">
              <input 
                type="range" 
                min="49" 
                max="1000" 
                value={priceRange[1]} 
                onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
              />
              <div className="price-inputs">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
              <button className="filter-btn">Filter</button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Pack Size</h3>
            <div className="size-options">
              {['100 G', '200 G', '300 G', '500 G', '1 Kg', '2 Kg', '5 Kg'].map(size => (
                <label key={size} className="size-option">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Product Rating</h3>
            <div className="rating-options">
              {[5, 4, 3, 2, 1].map(rating => (
                <label key={rating} className="rating-option">
                  <input
                    type="checkbox"
                    checked={selectedRating === rating}
                    onChange={() => handleRatingSelect(rating)}
                  />
                  <div className="stars">
                    {[...Array(rating)].map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Container */}
        <div className="products-container">
          <div className="products-header">
            <span>We found {products.length} items for you!</span>
            <select className="sort-select">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="products-grid">
            {products.map(product => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <button 
                    className="wishlist-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add wishlist functionality
                    }}
                  >
                    <FaHeart />
                  </button>
                  <button 
                    className="cart-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-weight">{product.weight}</div>
                  <div className="product-rating">
                    <FaStar className="star-icon" />
                    <span>({product.rating})</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">₹{product.price}</span>
                    <span className="original-price">₹{product.originalPrice}</span>
                  </div>
                  <button 
                    className="buy-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
