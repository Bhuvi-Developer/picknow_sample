import React from 'react';
import './ProductPage.css';

const ProductPage = ({ product }) => {
  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-details">
        <h1>{product.title}</h1>
        <div className="product-prices">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.previousPrice && (
            <span className="previous-price">${product.previousPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="add-to-wishlist">Wishlist</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
