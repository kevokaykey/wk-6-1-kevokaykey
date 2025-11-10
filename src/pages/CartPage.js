import React from 'react';
import { useStore } from '../store/StoreProvider.js';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { state, removeFromCart, updateCartQuantity } = useStore();
  
  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (state.cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Your Cart</h1>
        <p>Your cart is empty</p>
        <Link 
          to="/catalog" 
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            marginTop: '1rem'
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      
      <div>
        {state.cart.map(item => (
          <div key={item.id} className="cart-item">
            <div>
              <h4>{item.title}</h4>
              <p>by {item.author}</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  -
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              </div>
              
              <div style={{ minWidth: '80px', textAlign: 'right' }}>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid #ddd' }}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <Link 
          to="/checkout" 
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
