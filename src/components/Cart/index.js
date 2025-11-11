import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        <div className="cart-item">
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{backgroundColor: '#f0f0f0', width: '60px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px'}}>
              <span style={{color: '#666', fontSize: '24px'}}>📚</span>
            </div>
            <span>React in Action</span>
          </div>
          <span className="price">$39.99</span>
        </div>
        <div className="cart-item">
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{backgroundColor: '#f0f0f0', width: '60px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px'}}>
              <span style={{color: '#666', fontSize: '24px'}}>⚡</span>
            </div>
            <span>JavaScript Mastery</span>
          </div>
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
