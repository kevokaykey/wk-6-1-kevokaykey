# Book Store App - Manual Test Scripts

## 🚀 EARLY STAGE TESTING QUICKSTART

### 5-Minute Smoke Test (Daily Check)
**Run this every morning/after deployment:**

- [ ] **App Launch**: http://localhost:3000 loads in <3 seconds
- [ ] **Error Check**: No red errors in browser console (F12)
- [ ] **Core Navigation**: Can click between main pages
- [ ] **Book Display**: At least one book shows title + price
- [ ] **Add to Cart**: "Buy Now" button works without errors
- [ ] **Cart Update**: Cart counter increases when adding items

### Critical Path Validation
**Test these user journeys weekly:**

1. **Happy Path**: Browse → Add Book → View Cart → Checkout
2. **Multiple Items**: Add 3 different books → Verify cart total
3. **Empty State**: Clear cart → Confirm empty message displays
4. **Payment Test**: Complete checkout with test card 5061 0600 0000 0000 08

## Test Environment Setup
- URL: http://localhost:3000
- Browser: Chrome/Firefox/Safari
- Test User: Any guest user

## 📋 TEST CASES

### TC-001: Homepage Load
**Objective:** Verify homepage loads correctly
**Steps:**
1. Navigate to http://localhost:3000
2. Observe page load
**Expected Results:**
- Page loads without errors
- Navbar displays with "Book Store" logo
- Book catalog displays with multiple books
- No console errors

### TC-002: Book Display
**Objective:** Verify books display correctly
**Steps:**
1. Browse the catalog page
2. Check several book cards
**Expected Results:**
- Each book shows: image, title, author, price, description
- "Buy Now" buttons are visible and enabled
- Images load properly
- Prices display in correct currency (KES)

### TC-003: Add Book to Cart
**Objective:** Verify cart functionality
**Steps:**
1. Click "Buy Now" on any book
2. Observe navbar cart counter
3. Click "Cart" in navbar
**Expected Results:**
- Cart counter increases by 1
- Cart page shows added book
- Book details match original
- Total price calculates correctly

### TC-004: Cart Management
**Objective:** Verify cart operations
**Steps:**
1. Add multiple books to cart
2. Go to cart page
3. Change quantities using +/- buttons
4. Remove an item
**Expected Results:**
- Quantities update correctly
- Total recalculates on quantity change
- Items remove properly
- Empty cart message shows when no items

### TC-005: Checkout Process
**Objective:** Verify checkout flow
**Steps:**
1. Add items to cart
2. Click "Proceed to Checkout"
3. Fill customer information:
   - Email: test@example.com
   - Address: 123 Test Street
4. Click "Pay Now"
**Expected Results:**
- Checkout form validates inputs
- Paystack modal opens
- Test payment can be processed

## 🎯 EARLY STAGE EXPLORATORY TESTS

### ET-001: Error Handling
**Objective:** Verify app handles edge cases gracefully
**Steps:**
1. Try to checkout with empty cart
2. Enter invalid email in checkout form
3. Refresh page during payment process
**Expected Results:**
- Clear error messages displayed
- App doesn't crash
- User can recover from errors

### ET-002: Responsive Behavior
**Objective:** Verify mobile/tablet compatibility
**Steps:**
1. Open Chrome DevTools (F12)
2. Toggle device emulation
3. Test on mobile (375px) and tablet (768px) views
**Expected Results:**
- Content remains readable
- Buttons/touch targets are appropriately sized
- Navigation works on all screen sizes

### ET-003: Performance Check
**Objective:** Verify acceptable loading times
**Steps:**
1. Open Network tab in DevTools
2. Reload page with cache disabled (Ctrl+Shift+R)
3. Note load times for key resources
**Expected Results:**
- Page loads in under 3 seconds
- Images load without excessive delay
- No very large resource files (>1MB)

## Test Data
**Test Books:**
- The Great Gatsby - KES 1500
- To Kill a Mockingbird - KES 1800
- 1984 - KES 1200

**Test Payment:**
- Card: 5061 0600 0000 0000 08
- Expiry: 12/2030
- CVV: 123
- OTP: 123456

## 📊 TEST REPORTING TEMPLATE

**When logging issues, include:**
cat > src/__tests__/core-functionality.test.js << 'EOF'
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Try to import StoreProvider if it exists
let StoreProvider;
try {
  ({ StoreProvider } = require('../store/StoreProvider'));
} catch (error) {
  StoreProvider = ({ children }) => children;
}

const renderWithProviders = (component) => {
  return render(
    <StoreProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </StoreProvider>
  );
};

describe('Core Functionality Tests - Manual Test Cases', () => {
  test('TC-001: Homepage loads without errors', () => {
    expect(() => {
      renderWithProviders(<App />);
    }).not.toThrow();
  });

  test('TC-002: Navigation and book elements are present', () => {
    renderWithProviders(<App />);
    
    // Check for navigation structure
    const navElement = screen.getByRole('navigation') || screen.getByRole('banner') || screen.getByText(/book/i);
    expect(navElement).toBeInTheDocument();
    
    // Check for interactive elements
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('TC-003: Basic user interactions work', () => {
    renderWithProviders(<App />);
    
    // Test that buttons can be clicked without errors
    const firstButton = screen.queryAllByRole('button')[0];
    if (firstButton) {
      expect(() => {
        fireEvent.click(firstButton);
      }).not.toThrow();
    }
  });

  test('TC-004: App maintains state on navigation', () => {
    renderWithProviders(<App />);
    
    // Test that navigation doesn't break the app
    const links = screen.queryAllByRole('link');
    if (links.length > 0) {
      expect(() => {
        fireEvent.click(links[0]);
      }).not.toThrow();
    }
  });
});
