import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import { StoreProvider } from '../../store/StoreProvider';

// Render with all required providers
const renderWithProviders = (component) => {
  return render(
    <StoreProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </StoreProvider>
  );
};

describe('Shopping Flow Integration', () => {
  test('should render the app without crashing', () => {
    renderWithProviders(<App />);
    
    // Flexible text matching for "book store"
    const bookElement = screen.getByText(/book/i);
    expect(bookElement).toBeInTheDocument();
  });

  test('should display navigation elements', () => {
    renderWithProviders(<App />);
    
    // Check for common navigation text
    const hasNav = screen.getByText(/catalog/i) || screen.getByText(/cart/i);
    expect(hasNav).toBeInTheDocument();
  });

  test('basic app functionality', () => {
    renderWithProviders(<App />);
    
    // Just verify the app renders something
    expect(screen.getByRole('main') || screen.getByRole('banner') || screen.getByText(/book/i)).toBeInTheDocument();
  });
});
