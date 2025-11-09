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

    // Prefer explicit test ids for stability
    const navTitle = screen.getByTestId('nav-title');
    expect(navTitle).toBeInTheDocument();
  });

  test('should display navigation elements', () => {
    renderWithProviders(<App />);

    // Check for explicit navigation test ids
    const nav = screen.getByTestId('nav-title');
    const cart = screen.getByTestId('cart-link');
    expect(nav).toBeInTheDocument();
    expect(cart).toBeInTheDocument();
  });

  test('basic app functionality', () => {
    renderWithProviders(<App />);

    // Just verify the app renders something
    expect(screen.getByRole('main') || screen.getByRole('banner') || screen.getByText(/book/i)).toBeInTheDocument();
  });
});
