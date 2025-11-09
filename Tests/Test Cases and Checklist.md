# Test Cases & Checklist Report

## Test Cases

### 1. User Authentication
**Test Case 1.1:** Login with valid credentials
- Steps: Navigate to login page, enter valid username and password, click login
- Expected: User is redirected to dashboard/home page

**Test Case 1.2:** Login with invalid credentials
- Steps: Enter invalid username/password, click login
- Expected: Error message displayed, user remains on login page

**Test Case 1.3:** Logout functionality
- Steps: Click logout button
- Expected: User is redirected to login page, session is cleared

**Test Case 1.4:** Session persistence
- Steps: Login, reload page
- Expected: User remains logged in

### 2. Book Catalog
**Test Case 2.1:** List all books
- Steps: Navigate to catalog page
- Expected: All available books are displayed

**Test Case 2.2:** View book details
- Steps: Click on a book
- Expected: Book details page is shown with correct info

**Test Case 2.3:** Search books
- Steps: Enter search term, submit
- Expected: Only matching books are displayed

**Test Case 2.4:** Filter books
- Steps: Apply filter (e.g., genre, price)
- Expected: Books matching filter are displayed

**Test Case 2.5:** Pagination
- Steps: Navigate between pages
- Expected: Correct books are shown per page

### 3. Shopping Cart
**Test Case 3.1:** Add book to cart
- Steps: Click 'Add to Cart' on a book
- Expected: Book appears in cart, cart count updates

**Test Case 3.2:** Remove book from cart
- Steps: Remove book from cart
- Expected: Book is removed, cart count updates

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

## Testing Checklist

- [ ] All major user flows covered by tests
- [ ] Edge cases and error handling tested
- [ ] UI tested on multiple devices/browsers
- [ ] Security tests (authentication, authorization)
- [ ] Performance tests (API, UI responsiveness)
- [ ] Manual test scripts documented
- [ ] Automated tests run and pass (Cypress, Jest)
- [ ] Defect log updated for any issues found
- [ ] Regression tests after bug fixes
- [ ] Accessibility checks performed
- [ ] Code coverage reviewed
