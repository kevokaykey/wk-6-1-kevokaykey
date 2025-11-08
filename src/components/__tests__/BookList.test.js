import React from 'react';
import { render, screen } from '@testing-library/react';
import BookList from '../BookList';

const mockBooks = [
  {
    id: 1,
    title: 'Book One',
    author: 'Author One',
    price: 1000,
    description: 'Description One',
    image: '/image1.jpg'
  },
  {
    id: 2,
    title: 'Book Two', 
    author: 'Author Two',
    price: 2000,
    description: 'Description Two',
    image: '/image2.jpg'
  }
];

const mockOnPurchase = jest.fn();

describe('BookList Component', () => {
  test('should render list of books', () => {
    render(<BookList books={mockBooks} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('Book Two')).toBeInTheDocument();
  });

  test('should display correct number of books', () => {
    render(<BookList books={mockBooks} onPurchase={mockOnPurchase} />);
    
    const bookTitles = screen.getAllByText(/Book/);
    expect(bookTitles).toHaveLength(2);
  });
});
