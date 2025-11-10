import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar.js';
import { StoreProvider } from '../../store/StoreProvider.js';

const renderWithProviders = (component) => {
  return render(
    <StoreProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </StoreProvider>
  );
};

describe('Navbar Component', () => {
  test('should render navigation links', () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId('nav-title')).toBeInTheDocument();
    expect(screen.getByTestId('cart-link')).toBeInTheDocument();
  });

  test('should display cart item count (default 0)', () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });
});
