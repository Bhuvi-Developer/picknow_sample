import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import CartPage from '../CartPage/CartPage';
import './ProductPage.css';
import Nuts from '../../assets/Nuts.jpg';
import honey from '../../assets/honey.jpg' 
import BestSelling from '../BestSellingProduct/BestSellingProduct';

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState('listing');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const [addedProducts, setAddedProducts] = useState({}); // Track added products

  // Load cart from local storage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      console.log('Loaded cart from local storage:', JSON.parse(storedCart));
    }
  }, []);

  // Update local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Updated local storage:', cart);
  }, [cart]);

  const products = [
    {
      id: 1,
      name: 'Premium Almonds',
      weight: '100g',
      price: 249,
      originalPrice: 299,
      image: Nuts,
      description: 'Premium quality almonds, rich in nutrients and perfect for snacking.',
    },
    {
      id: 2,
      name: 'Premium Nuts',
      weight: '100g',
      price: 249,
      originalPrice: 299,
      image: Nuts,
      description: 'Premium quality nuts, rich in nutrients and perfect for snacking.',
    },
    {
      id: 3,
      name: 'Premium Honey',
      weight: '100g',
      price: 249,
      originalPrice: 299,
      image: Nuts,
      description: 'Premium quality honey, rich in nutrients and perfect for snacking.',
    },
    // Add more products as needed
  ];

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // If the product is already in the cart, update the quantity
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // If not, add it to the cart
      return [...prevCart, { ...product, quantity }];
    });

    // Mark the product as added
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    console.log(`Added to cart: ${product.name} (Quantity: ${quantity})`);
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

  const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const product = products.find(p => p.id === selectedProductId);

    if (!product) return null;

    return (
      <div className="product-detail">
        <button onClick={() => setCurrentPage('listing')} className="back-button">
          <ArrowLeft className="icon" />
          Back to products
        </button>
        <div className="detail-grid">
          <img src={product.image} alt={product.name} className="detail-image" />
          <div className="detail-info">
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-description">{product.description}</p>
            <div className="price-container">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
            </div>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button
              onClick={() => addToCart(product, quantity)}
              className="add-cart-button"
            >
              {addedProducts[product.id] ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    );
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

  return currentPage === 'listing' ? (
    <BestSelling
      products={products}
      setSelectedProductId={setSelectedProductId}
      setCurrentPage={setCurrentPage}
    />
  ) : (
    <ProductDetail />
  );
};

export default ProductPage;
