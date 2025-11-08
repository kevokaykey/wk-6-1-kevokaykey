import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from '../BookCard';

jest.mock('../../config/currency', () => ({
  formatCurrency: jest.fn((price) => \`KSh\${price}\`)
}));

const mockBook = {
  id: 1,
  title: 'Test Book',
  author: 'Test Author',
  price: 1500,
  description: 'Test description',
  image: '/test-image.jpg'
};

const mockOnPurchase = jest.fn();

describe('BookCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render book information correctly', () => {
    render(<BookCard book={mockBook} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('by Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  test('should call onPurchase when buy button is clicked', () => {
    render(<BookCard book={mockBook} onPurchase={mockOnPurchase} />);
    
    const buyButton = screen.getByText('Buy Now');
    fireEvent.click(buyButton);
    
    expect(mockOnPurchase).toHaveBeenCalledWith(mockBook);
  });

  test('should display book image with alt text', () => {
    render(<BookCard book={mockBook} onPurchase={mockOnPurchase} />);
    
    const image = screen.getByAltText('Test Book by Test Author');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });
});
