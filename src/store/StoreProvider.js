import React from 'react';
import { bookData } from '../data/books.js';

const StoreContext = React.createContext();

export const useStore = () => {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

const StoreProvider = ({ children }) => {
  const [state, setState] = React.useState({
    user: null,
    cart: [],
    books: bookData,
    orders: []
  });

  const value = {
    state,
    setState,
    addToCart: (book) => {
      setState(prev => {
        const existingItem = prev.cart.find(item => item.id === book.id);
        if (existingItem) {
          return {
            ...prev,
            cart: prev.cart.map(item =>
              item.id === book.id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        } else {
          return {
            ...prev,
            cart: [...prev.cart, { ...book, quantity: 1 }]
          };
        }
      });
    },
    removeFromCart: (bookId) => {
      setState(prev => ({
        ...prev,
        cart: prev.cart.filter(item => item.id !== bookId)
      }));
    },
    updateCartQuantity: (bookId, quantity) => {
      if (quantity <= 0) {
        setState(prev => ({
          ...prev,
          cart: prev.cart.filter(item => item.id !== bookId)
        }));
      } else {
        setState(prev => ({
          ...prev,
          cart: prev.cart.map(item =>
            item.id === bookId ? { ...item, quantity } : item
          )
        }));
      }
    },
    clearCart: () => {
      setState(prev => ({ ...prev, cart: [] }));
    }
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
