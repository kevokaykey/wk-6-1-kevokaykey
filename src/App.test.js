import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { StoreProvider } from './store/StoreProvider';

test('renders book store app', () => {
  render(
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  );
  const navTitle = screen.getByTestId('nav-title');
  expect(navTitle).toBeInTheDocument();
});