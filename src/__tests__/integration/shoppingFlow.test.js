import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('Shopping Flow Integration', () => {
  test('should render the app without crashing', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/book store/i)).toBeInTheDocument();
  });

  test('should display navigation links', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  test('should navigate between pages', () => {
    renderWithRouter(<App />);
    
    fireEvent.click(screen.getByText(/cart/i));
    expect(window.location.pathname).toBe('/cart');
    
    fireEvent.click(screen.getByText(/catalog/i));
    expect(window.location.pathname).toBe('/catalog');
  });
});
