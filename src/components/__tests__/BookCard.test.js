import { render, screen } from '@testing-library/react';
import BookCard from '../BookCard';

const mockBook = {
  id: 1,
  title: 'Test Book',
  author: 'Test Author',
  price: 1500,
  description: 'Test description',
  image: '/test-image.jpg'
};

test('renders book card with title', () => {
  render(<BookCard book={mockBook} onPurchase={() => {}} />);
  const titleElement = screen.getByText(/Test Book/i);
  expect(titleElement).toBeInTheDocument();
});