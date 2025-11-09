import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../store/StoreProvider';

const Navbar = () => {
  const { cartCount } = useContext(StoreContext);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Clear search on route change to avoid confusion
    setSearch('');
  }, [location.pathname]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearch('');
      inputRef.current && inputRef.current.focus();
    }
    if (e.key === 'Enter') {
      navigate('/catalog');
    }
  };

  return (
    <nav className="bg-primary-dark text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/catalog" className="text-2xl font-bold" data-testid="nav-title">📚 BookStore</Link>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <label htmlFor="navbar-search" className="sr-only">Search books</label>
            <input
              id="navbar-search"
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={onKeyDown}
              ref={inputRef}
              className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" aria-label={`Cart with ${cartCount} items`} className="relative" data-testid="cart-link">
              <span className="text-lg">🛒</span>
              <span data-testid="cart-count" className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 min-w-[1.25rem] text-center" aria-live="polite">{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

