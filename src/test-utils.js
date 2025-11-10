import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Custom render function with common providers
const customRender = (ui, options = {}) => {
  const AllProviders = ({ children }) => {
    return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: AllProviders, ...options });
};

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override the render method
export { customRender as render };

// Export test data
export * from './test-utils/test-data';
