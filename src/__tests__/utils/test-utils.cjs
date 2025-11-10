/**
 * Test utilities for React components (CommonJS version)
 * This file provides utility functions for testing React components
 */

const React = require('react');
const { render } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');

/**
 * Renders a React component with Router provider for testing
 */
function renderWithProviders(ui, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);
  
  const Wrapper = ({ children }) => {
    return React.createElement(BrowserRouter, null, children);
  };
  
  return render(ui, { wrapper: Wrapper });
}

/**
 * Mock user data for testing
 */
const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'user'
};

/**
 * Mock product data for testing
 */
const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 99.99,
  category: 'books',
  inStock: true
};

/**
 * Mock API response helper
 */
const createMockResponse = (data, success = true) => ({
  data,
  success,
  timestamp: new Date().toISOString()
});

/**
 * Wait helper for async operations in tests
 */
const waitForLoading = (ms = 100) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Create a mock function for testing
 */
const createMockFunction = () => {
  return jest.fn();
};

// Export all utilities
module.exports = {
  renderWithProviders,
  mockUser,
  mockProduct,
  createMockResponse,
  waitForLoading,
  createMockFunction
};
