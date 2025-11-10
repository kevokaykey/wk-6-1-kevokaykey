# Book Store App - Manual Test Scripts

## 🚀 QUICK START GUIDE
**Time:** 5-10 minutes  
**Frequency:** Daily / After deployments

### 5-Minute Smoke Test
- [ ] **App Launch**: http://localhost:3000 loads
- [ ] **Error Check**: No red errors in browser console (F12 → Console)
- [ ] **Navigation**: Click between main pages works
- [ ] **Book Display**: Books show titles and prices
- [ ] **Add to Cart**: "Buy Now" buttons work
- [ ] **Cart Update**: Cart counter increases

### Critical Path Validation
**Test these weekly:**
1. **Happy Path**: Browse → Add Book → View Cart → Checkout
2. **Multiple Items**: Add 3 books → Verify cart total
3. **Empty State**: Clear cart → Confirm empty message
4. **Payment Test**: Complete checkout with test card

---
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
---

## 🎯 EXPLORATORY TESTING

### ET-001: Error Handling
**Steps:**
1. Try checkout with empty cart
2. Enter invalid email in checkout
3. Refresh during payment process
**Expected:** Clear errors, no crashes

### ET-002: Mobile Responsive
**Steps:**
1. Open Chrome DevTools (F12)
2. Toggle device toolbar
3. Test mobile (375px) and tablet (768px)
**Expected:** Readable content, proper touch targets

### ET-003: Performance Check
**Steps:**
1. Open Network tab in DevTools
2. Reload with cache disabled (Ctrl+Shift+R)
3. Note load times
**Expected:** <3 second load, no large files

## 📊 DEFECT REPORTING TEMPLATE

## 🔄 TESTING SCHEDULE
- **Daily** (5 min): Quick smoke test  
- **Weekly** (15 min): Full manual suite
- **Per Release** (30 min): Comprehensive + exploratory