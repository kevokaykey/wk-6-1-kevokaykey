# Test Cases & Checklist Report

## Reference
This report is aligned with the technical issues and classifications documented in the [Defect Log Report](./Defect_Log.md). Test cases are designed to validate functional, structural, and execution aspects, and to catch regressions highlighted in the defect log.

---

## Test Cases

### 1. Application Bootstrap & Mounting
- **TC-1.1:** Verify root component (`App.js`) mounts without runtime exceptions.
  - Steps: Start app, observe initial render, check for uncaught exceptions.
  - Expected: `#root` element exists, Book Store header visible, no errors in console.
  - Related Defect: D-001 (bootstrap failure)
- **TC-1.2:** Validate static asset loading.
  - Steps: Inspect network requests for 404s on assets in `public/`.
  - Expected: All required assets load successfully.

**Test Case 1.2:** Login with invalid credentials
- Steps: Enter invalid username/password, click login
- Expected: Error message displayed, user remains on login page

**Test Case 1.3:** Logout functionality
- Steps: Click logout button
- Expected: User is redirected to login page, session is cleared

**Test Case 1.4:** Session persistence
- Steps: Login, reload page
- Expected: User remains logged in

### 2. Homepage (Catalog) Rendering
- **TC-2.1:** Catalog page renders book list.
  - Steps: Visit `/`, check for book cards.
  - Expected: All books from data source are displayed.
  - Related Defect: D-002 (homepage not rendering)
- **TC-2.2:** Catalog page handles missing/invalid data gracefully.
  - Steps: Simulate empty or malformed data.
  - Expected: User-friendly error or empty state shown.

**Test Case 2.3:** Search books
- Steps: Enter search term, submit
- Expected: Only matching books are displayed

**Test Case 2.4:** Filter books
- Steps: Apply filter (e.g., genre, price)
- Expected: Books matching filter are displayed

**Test Case 2.5:** Pagination
- Steps: Navigate between pages
- Expected: Correct books are shown per page

### 3. Cart Operations
- **TC-3.1:** Add book to cart triggers correct async state.
  - Steps: Click 'Add to Cart', observe loading and completion.
  - Expected: Cart updates, loading state clears.
  - Related Defect: D-003 (loading state stuck)
- **TC-3.2:** Remove book from cart updates UI and state.
- **TC-3.3:** Cart persists across navigation and reload.

**Test Case 3.3:** Update quantity
- Steps: Change quantity in cart
- Expected: Total price updates accordingly

**Test Case 3.4:** Cart persistence
- Steps: Add books, navigate away, return
- Expected: Cart contents remain

### 4. Checkout Process
**Test Case 4.1:** Successful checkout
- Steps: Add books to cart, proceed to checkout, enter valid payment info, confirm
- Expected: Order is placed, confirmation shown

**Test Case 4.2:** Invalid payment details
- Steps: Enter invalid payment info
- Expected: Error message, order not placed

**Test Case 4.3:** Order summary accuracy
- Steps: Review order summary before payment
- Expected: Details match cart contents

**Test Case 4.4:** Order confirmation
- Steps: Complete checkout
- Expected: Confirmation page/email received

### 5. Admin Page
**Test Case 5.1:** Add new book
- Steps: Login as admin, add book details, submit
- Expected: Book appears in catalog

**Test Case 5.2:** Edit book
- Steps: Edit existing book details
- Expected: Changes are reflected in catalog

**Test Case 5.3:** Delete book
- Steps: Delete a book
- Expected: Book is removed from catalog

**Test Case 5.4:** View orders
- Steps: Access orders page
- Expected: All orders are listed

**Test Case 5.5:** Access control
- Steps: Try to access admin page as non-admin
- Expected: Access denied or redirected

### 6. UI/UX
**Test Case 6.1:** Responsive design
- Steps: Open site on mobile, tablet, desktop
- Expected: Layout adapts correctly

**Test Case 6.2:** Navigation links
- Steps: Click all navigation links
- Expected: Correct pages load

**Test Case 6.3:** Error messages
- Steps: Trigger errors (e.g., invalid form input)
- Expected: Clear, visible error messages

### 7. API Integration
**Test Case 7.1:** Fetch book data
- Steps: Load catalog page
- Expected: API returns correct data

**Test Case 7.2:** API error handling
- Steps: Simulate API failure
- Expected: User-friendly error message shown

**Test Case 7.3:** API performance
- Steps: Load large data set
- Expected: Data loads within acceptable time

### 8. Security
**Test Case 8.1:** Authentication required for protected routes
- Steps: Access protected route without login
- Expected: Redirected to login

**Test Case 8.2:** Authorization for admin actions
- Steps: Attempt admin actions as regular user
- Expected: Access denied

**Test Case 8.3:** Input validation
- Steps: Submit forms with invalid data
- Expected: Validation errors shown

### 9. Performance
**Test Case 9.1:** Page load time
- Steps: Load main pages
- Expected: Pages load within 2 seconds

**Test Case 9.2:** Stress test checkout
- Steps: Simulate multiple checkouts
- Expected: No crashes, acceptable response time

## Technical Testing Checklist

- [ ] All functional and structural flows validated (see Defect Log for coverage)
- [ ] Automated tests (Cypress, Jest) executed and passed
- [ ] Manual test scripts executed for UI/UX and edge cases
- [ ] Error handling and async state transitions tested
- [ ] Security: authentication and authorization enforced
- [ ] Performance: page load and API response times measured
- [ ] Accessibility: basic checks for ARIA, keyboard navigation
- [ ] Code coverage reviewed for critical modules
- [ ] Regression tests run after defect fixes
- [ ] Evidence (screenshots, logs) attached for failed cases
