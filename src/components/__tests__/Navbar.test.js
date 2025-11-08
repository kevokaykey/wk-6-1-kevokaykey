import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  test('should render navigation links', () => {
    renderWithRouter(<Navbar cartItems={[]} />);
    
    expect(screen.getByText(/book store/i)).toBeInTheDocument();
    expect(screen.getByText(/catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  test('should display cart item count', () => {
    const mockCartItems = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 }
    ];
    
    renderWithRouter(<Navbar cartItems={mockCartItems} />);
    
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('should show 0 when cart is empty', () => {
    renderWithRouter(<Navbar cartItems={[]} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
