import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import StoreProvider from './store/StoreProvider.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
