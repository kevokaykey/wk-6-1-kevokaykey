# Book Store App - Manual Test Scripts

## Test Environment Setup
- URL: http://localhost:3000
- Browser: Chrome/Firefox/Safari
- Test User: Any guest user

## Test Cases

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

## Test Data
**Test Books:**
- The Great Gatsby - KES 1500
- To Kill a Mockingbird - KES 1800
- 1984 - KES 1200

**Test Payment:**
- Use test card in Paystack modal