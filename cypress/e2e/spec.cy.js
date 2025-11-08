describe('Basic Test', () => {
  it('should load the app', () => {
    cy.visit('/');
    cy.contains('Book Store').should('be.visible');
  });
});