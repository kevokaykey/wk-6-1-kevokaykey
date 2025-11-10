import React, { useState } from 'react';
import { formatCurrency } from '../config/currency.js';

const BookCard = ({ book, onPurchase }) => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      await onPurchase(book);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={book.image}
        alt={`${book.title} by ${book.author}`}
        className="w-full h-64 object-cover"
        loading="lazy"
        width="400"
        height="256"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2" data-testid="book-title">{book.title}</h3>
        <p className="text-gray-600 mb-2">by {book.author}</p>
        <p className="text-gray-700 text-sm mb-4">{book.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary-dark" data-testid="book-price">{formatCurrency(book.price)}</span>
          <button
            onClick={handlePurchase}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
            data-testid="book-buy-button"
          >
            {loading ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
