import React from 'react';
import { useStore } from '../store/StoreProvider.js';

const CatalogPage = () => {
  const { state, addToCart } = useStore();

  return (
    <div>
      <h1>Book Catalog</h1>
      <p>Browse our collection of books</p>
      
      <div className="book-grid">
        {state.books.map(book => (
          <div key={book.id} className="book-card">
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '3rem',
              borderRadius: '4px'
            }}>
              📚
            </div>
            
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <p><strong>${book.price}</strong></p>
            <p style={{ color: book.inStock ? 'green' : 'red' }}>
              {book.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            
            <button
              onClick={() => addToCart(book)}
              disabled={!book.inStock}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: book.inStock ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: book.inStock ? 'pointer' : 'not-allowed'
              }}
            >
              {book.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
