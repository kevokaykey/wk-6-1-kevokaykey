// src/components/BookList/index.js
import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/StoreProvider';
import BookCard from '../BookCard';
import Search from '../Search';

// Sample book data - you can move this to a separate data file later
const sampleBooks = [
  {
    id: 1,
    title: "React in Action",
    author: "Mark Tielens Thomas",
    price: 39.99,
    image: "https://via.placeholder.com/300x400?text=React+in+Action",
    description: "A comprehensive guide to React development",
    stock: 10
  },
  {
    id: 2,
    title: "Learning React",
    author: "Alex Banks and Eve Porcello",
    price: 34.99,
    image: "https://via.placeholder.com/300x400?text=Learning+React",
    description: "Modern patterns for developing React apps",
    stock: 5
  },
  {
    id: 3,
    title: "Fullstack React",
    author: "Anthony Accomazzo et al.",
    price: 49.99,
    image: "https://via.placeholder.com/300x400?text=Fullstack+React",
    description: "The complete guide to React and friends",
    stock: 8
  },
  {
    id: 4,
    title: "Pro React 16",
    author: "Adam Freeman",
    price: 44.99,
    image: "https://via.placeholder.com/300x400?text=Pro+React+16",
    description: "Build powerful and dynamic web apps",
    stock: 3
  },
  {
    id: 5,
    title: "React Design Patterns",
    author: "Anthony Ng",
    price: 37.99,
    image: "https://via.placeholder.com/300x400?text=React+Design+Patterns",
    description: "Best practices for scalable React applications",
    stock: 12
  },
  {
    id: 6,
    title: "The Road to React",
    author: "Robin Wieruch",
    price: 29.99,
    image: "https://via.placeholder.com/300x400?text=The+Road+to+React",
    description: "Your journey to master React",
    stock: 15
  }
];

const BookList = () => {
  const { dispatch } = useStore();
  const [books] = useState(sampleBooks);
  const [filteredBooks, setFilteredBooks] = useState(sampleBooks);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBooks(books);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (book) => {
    dispatch({ type: 'ADD_TO_CART', payload: book });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Book Catalog</h1>
        
        {/* Search Component */}
        <Search onSearch={handleSearch} />
        
        {/* Search results info */}
        {searchQuery && (
          <p className="text-gray-600 mt-4">
            Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} 
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        )}
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found matching your search.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-blue-500 hover:underline mt-2"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          data-testid="catalog-container"
        >
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;