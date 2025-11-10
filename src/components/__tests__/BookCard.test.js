import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from '../BookCard.js';
import { createBook } from '../../test-utils.js';

const mockBook = createBook({
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test description',
  image: '/test-image.jpg'
});

const mockOnPurchase = jest.fn();

describe('BookCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders book information correctly', () => {
    render(<BookCard book={mockBook} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  test('calls onPurchase when buy button is clicked', () => {
    render(<BookCard book={mockBook} onPurchase={mockOnPurchase} />);
    
    const buyButton = screen.getByText(/buy now/i);
    fireEvent.click(buyButton);
    
    expect(mockOnPurchase).toHaveBeenCalledWith(mockBook);
  });

  test('displays book image with alt text', () => {
    render(<BookCard book={mockBook} onPurchase={mockOnPurchase} />);
    
    const image = screen.getByAltText(/Test Book/);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });
});
