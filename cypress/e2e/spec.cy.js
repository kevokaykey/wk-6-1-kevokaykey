describe('Basic App Functionality', () => {
  it('should load the application', () => {
    cy.visit('/');
    cy.get('body').should('be.visible');
  });

  it('should have a navigation bar', () => {
    cy.visit('/');
    cy.get('nav').should('exist').or('header').should('exist');
  });

  it('should be accessible on different viewports', () => {
    cy.viewport('iphone-6');
    cy.visit('/');
    cy.get('body').should('be.visible');
    
    cy.viewport('macbook-15');
    cy.visit('/');
    cy.get('body').should('be.visible');
  });
});
