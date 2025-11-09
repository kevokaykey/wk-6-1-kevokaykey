# Defect Log Report
Date: November 9, 2025

## Summary
This defect log documents issues identified through automated testing using Cypress. The defects are categorized by severity and priority, with supporting evidence from test execution screenshots.

## Defect 1: Application Loading Failure
- Severity: High
- Priority: High
- Status: Open
- Test Case: Basic Application Load Test
- Evidence: `cypress/screenshots/spec.cy.js/Basic Test -- should load the app (failed).png`
- Description: The application fails to load properly during basic initialization test.
- Technical Details:
  - Component: Root application component
  - Test Location: `cypress/e2e/spec.cy.js`
  - Environment: Local development environment
  - Expected Behavior: Application should bootstrap and render the main layout
  - Actual Behavior: Application fails to initialize properly
  - Potential Root Causes:
    1. React application entry point (`src/index.js`) failing to mount
    2. Missing or incorrect environment variables
    3. Failed API initialization or connection issues
    4. Missing static assets or incorrect public path configuration
- Impact: Critical - Users cannot access the application
- Recommended Action: 
  1. Check React application entry point in `src/index.js`
  2. Verify environment configuration
  3. Review network requests during initialization
  4. Check console errors during bootstrap process

## Defect #2: Homepage Loading Issue
- Severity: High
- Priority: High
- Status: Open
- Test Case: Book Store E2E Test - Homepage Load
- Evidence: `cypress/screenshots/bookstore.cy.js/Book Store E2E Tests -- should load the homepage (failed).png`
-Description: Homepage fails to load during end-to-end testing
- Technical Details:
  - Component: Homepage (`CatalogPage.js`)
  - Test Location: `cypress/e2e/bookstore.cy.js`
  - Test Assertion: `cy.contains('Book Store').should('be.visible')`
  - Component Dependencies:
    1. `BookList.js` - Responsible for rendering book grid
    2. `BookCard.js` - Individual book display components
  - Data Flow:
    1. Books data loaded from `src/data/books.js`
    2. Passed to `BookList` component
    3. Mapped to individual `BookCard` components
  - Potential Root Causes:
    1. Books data not being loaded properly
    2. Component mounting issues in `BookList`
    3. Missing or incorrect title text in header
    4. Styling issues making text invisible
- **Impact**: Critical - Users cannot view the main page of the bookstore
- Recommended Action: 
  1. Verify books data loading process
  2. Check component mounting lifecycle
  3. Review header rendering
  4. Inspect CSS visibility properties

## Defect #3: Shopping Cart Addition Failure
- Severity: Medium
- Priority: High
- Status: Open
-Test Case: Book Store E2E Test - Add to Cart
-Evidence: `cypress/screenshots/bookstore.cy.js/Book Store E2E Tests -- should add book to cart (failed).png`
- Description: System fails to add books to the shopping cart
- Technical Details:
  - Components Involved: 
    1. `BookCard.js` - Contains the purchase button and handling logic
    2. `StoreProvider.js` - Manages cart state
    3. `CheckoutService.js` - Handles purchase operations
  - Test Location: `cypress/e2e/bookstore.cy.js`
  - Implementation Details:
    - Purchase button uses data-testid="book-buy-button"
    - State handling through useState hook in BookCard
    - Async purchase operation with loading state management
  - Error Conditions:
    1. Loading state gets stuck (observed in BookCard component)
    2. Purchase operation not completing
    3. State updates not reflecting in UI
  - **Relevant Code Snippet**:
    ```javascript
    const handlePurchase = async () => {
      setLoading(true);
      try {
        await onPurchase(book);
      } finally {
        setLoading(false);
      }
    };
    ```
- Impact: High - Users cannot purchase books
- Recommended Action: 
  1. Debug async purchase operation in BookCard
  2. Verify StoreProvider state updates
  3. Check error handling in purchase flow
  4. Add error state handling to purchase button
  5. Implement proper loading state timeout

## Defect #4: Cart Page Navigation Issue
- Severity: Medium
- Priority: Medium
- Status: Open
- Test Case: Book Store E2E Test - Cart Navigation
- Evidence: `cypress/screenshots/bookstore.cy.js/Book Store E2E Tests -- should navigate to cart page (failed).png`
- Description: Navigation to cart page is not functioning as expected
- Technical Details:
  - Components Involved: 
    1. `Navbar.js` - Contains navigation links
    2. `CartPage.js` - Cart page component
    3. Application routing configuration
  - Test Location: `cypress/e2e/bookstore.cy.js`
  - Test Steps:
    ```javascript
    cy.contains('Cart').click();
    cy.url().should('include', '/cart');
    ```
  - Expected Navigation Flow:
    1. Click on Cart link in Navbar
    2. URL should update to include '/cart'
    3. CartPage component should mount
    4. Empty cart message should be visible
  -Observed Issues:
    1. Navigation event not triggering properly
    2. URL not updating after navigation
    3. Cart page component potentially failing to mount
  - Related Test:
    ```javascript
    it('should handle empty cart state', () => {
      cy.visit('/cart');
      cy.contains('empty', { matchCase: false }).should('be.visible');
    });
    ```
- Impact: High - Users cannot access their shopping cart
- Recommended Action: 
  1. Verify React Router configuration
  2. Check Navbar link event handlers
  3. Debug CartPage component mounting
  4. Validate route definitions
  5. Test direct URL navigation to /cart
  6. Add error boundaries around navigation components

## Severity Levels
- High: Critical functionality is impacted
- Medium: Important functionality is impaired but workarounds may exist
- Low: Minor issues that don't significantly impact core functionality

## Priority Levels
- High: Requires immediate attention
- Medium: Should be addressed in the current sprint
- Low: Can be addressed in future sprints

## Next Steps
1. Immediate investigation of application loading issues
2. Review and fix homepage component issues
3. Debug shopping cart functionality
4. Test and fix navigation system

## Notes
- All defects were identified through automated Cypress tests
- Screenshots are available in the cypress/screenshots directory
- Multiple related failures suggest potential underlying architectural issues