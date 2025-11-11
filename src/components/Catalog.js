import React, { useState } from 'react';

const Catalog = () => {
  const [books] = useState([
    { 
      id: 1, 
      title: 'React in Action', 
      author: 'Mark Thomas', 
      price: 39.99,
      emoji: '📚'
    },
    { 
      id: 2, 
      title: 'JavaScript Mastery', 
      author: 'Sarah Johnson', 
      price: 34.99,
      emoji: '⚡'
    },
    { 
      id: 3, 
      title: 'CSS Secrets', 
      author: 'Alex Chen', 
      price: 29.99,
      emoji: '🎨'
    },
    { 
      id: 4, 
      title: 'Node.js Guide', 
      author: 'Mike Wilson', 
      price: 44.99,
      emoji: '🚀'
    }
  ]);

  const addToCart = (book) => {
    console.log('Added to cart:', book);
  };

  return (
    <div className="catalog">
      <h2>Book Catalog</h2>
      <div className="book-list">
        {books.map(book => (
          <div key={book.id} className="book-item" data-testid="book-item">
            <div style={{backgroundColor: '#f0f0f0', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', borderRadius: '5px'}}>
              <span style={{color: '#666', fontSize: '48px'}}>{book.emoji}</span>
            </div>
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <p className="price">${book.price}</p>
            <button 
              className="add-to-cart"
              onClick={() => addToCart(book)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
