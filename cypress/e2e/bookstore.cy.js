describe('Book Store E2E Tests', () => {
  beforeEach(() => {
    // Stub books API (if the app fetches remote data) to make E2E deterministic
    cy.intercept('GET', '/api/books', { fixture: 'books.json' }).as('getBooks');
    cy.visit('/');
    // wait for the stubbed request when applicable
    cy.wait(200); // small wait to allow UI to render when no network call is present
  });

  it('should load the homepage', () => {
    cy.contains('Book Store').should('be.visible');
  });

  it('should display books', () => {
    // Check if book cards exist (they might have different selectors)
    cy.get('[data-testid="book-card"]').should('exist').or('.book-card').should('exist').or('.book').should('exist');
  });

  it('should have working navigation', () => {
    // Test navigation links
    cy.contains('Cart').click();
    cy.url().should('include', '/cart');

    cy.contains('Catalog').click();
    cy.url().should('include', '/catalog');
  });

  it('should handle empty cart state', () => {
    cy.visit('/cart');
    cy.contains('empty', { matchCase: false }).should('be.visible');
  });
});
