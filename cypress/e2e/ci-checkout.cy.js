describe('CI: Checkout smoke test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/books', { fixture: 'books.json' }).as('getBooks');
    cy.intercept('POST', '/api/cart', { statusCode: 200 }).as('addToCart');
    cy.visit('/');
    cy.wait('@getBooks');
  });

  it('adds an item to cart and proceeds to checkout (mocked)', () => {
    cy.get('[data-testid="book-card"]').first().within(() => {
      cy.get('[data-testid="add-to-cart"]').click();
    });
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);

    cy.get('[data-testid="cart-icon"]').click();
    cy.url().should('include', '/cart');

    cy.get('[data-testid="checkout-button"]').click();
    cy.url().should('include', '/checkout');

    cy.get('[data-testid="checkout-form"]').within(() => {
      cy.get('input[name="email"]').type('ci@example.com');
      cy.get('input[name="name"]').type('CI Tester');
      cy.get('input[name="address"]').type('123 Test Lane');
    });

    // Mock payment submission: simply assert form submit is possible
    cy.get('[data-testid="place-order"]').click();
    cy.get('[data-testid="confirmation-page"]').should('be.visible');
  });
});
