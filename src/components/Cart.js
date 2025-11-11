import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        <div className="cart-item">
          <span>React in Action</span>
          <span className="price">$39.99</span>
        </div>
        <div className="cart-item">
          <span>JavaScript Mastery</span>
          <span className="price">$34.99</span>
        </div>
      </div>
      <div className="cart-total">
        <strong>Total: $74.98</strong>
      </div>
      <Link to="/checkout" className="checkout-button">
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default Cart;
