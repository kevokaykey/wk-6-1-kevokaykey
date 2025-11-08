describe('Book Store E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
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
