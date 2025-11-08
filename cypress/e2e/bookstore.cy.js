describe('Book Store E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should load the homepage', () => {
    cy.contains('Book Store').should('be.visible');
    cy.get('[data-testid="book-card"]').should('have.length.at.least', 1);
  });

  it('should add book to cart', () => {
    cy.get('[data-testid="book-buy-button"]').first().click();
    cy.get('[data-testid="cart-count"]').should('contain', '1');
  });

  it('should navigate to cart page', () => {
    cy.get('a').contains('Cart').click();
    cy.url().should('include', '/cart');
    cy.contains('Your Cart').should('be.visible');
  });
});