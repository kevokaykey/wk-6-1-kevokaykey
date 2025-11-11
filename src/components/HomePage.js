import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Our Book Store</h1>
        <p>Discover amazing books for every reader</p>
        <Link to="/catalog" className="cta-button">
          Browse Books
        </Link>
      </section>
      
      <section className="featured-books">
        <h2>Featured Books</h2>
        <div className="book-grid">
          <div className="book-card" data-testid="book-card">
            <div style={{backgroundColor: '#f0f0f0', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', borderRadius: '5px'}}>
              <span style={{color: '#666', fontSize: '48px'}}>📚</span>
            </div>
            <h3>React in Action</h3>
            <p>Learn React the right way with practical examples</p>
            <p className="price">$39.99</p>
            <button className="buy-button">Buy Now</button>
          </div>
          <div className="book-card" data-testid="book-card">
            <div style={{backgroundColor: '#f0f0f0', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', borderRadius: '5px'}}>
              <span style={{color: '#666', fontSize: '48px'}}>⚡</span>
            </div>
            <h3>JavaScript Mastery</h3>
            <p>Master modern JavaScript and ES6+ features</p>
            <p className="price">$34.99</p>
            <button className="buy-button">Buy Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
