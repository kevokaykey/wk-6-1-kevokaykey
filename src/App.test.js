import { render, screen } from '@testing-library/react';
import App from './App';

test('renders book store app', () => {
  render(<App />);
  const linkElement = screen.getByText(/book store/i);
  expect(linkElement).toBeInTheDocument();
});