describe('CI: Homepage smoke tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/books', { fixture: 'books.json' }).as('getBooks');
    cy.visit('/');
    cy.wait('@getBooks');
  });

  it('should load the homepage and display header', () => {
    cy.contains('Book Store').should('be.visible');
  });

  it('should display at least one book card', () => {
    cy.get('[data-testid="book-card"]').should('exist');
  });
});
