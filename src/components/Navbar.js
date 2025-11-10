import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/StoreProvider.js';

const Navbar = () => {
  const { state } = useStore();
  const location = useLocation();
  
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/">BookStore</Link>
      <Link to="/catalog">Catalog</Link>
      <Link to="/cart">Cart {cartItemsCount > 0 && `(${cartItemsCount})`}</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
};

export default Navbar;
