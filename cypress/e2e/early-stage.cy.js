/// <reference types="cypress" />

describe('Early Stage Smoke Tests', () => {
  it('should load the application', () => {
    cy.visit('/');
    cy.url().should('include', 'localhost:3000');
    cy.get('body').should('be.visible');
  });

  it('should have basic page structure', () => {
    cy.visit('/');
    // Check for common elements without being too specific
    cy.get('h1, h2, h3, [role="banner"]').should('exist');
    cy.get('button, a, [role="button"]').should('have.length.at.least', 1);
  });

  it('should handle user interactions without crashing', () => {
    cy.visit('/');
    // Safe interaction test - just verify clicks don't crash
    cy.get('button').first().click({ force: true });
    cy.get('body').should('be.visible'); // App didn't crash
  });

  it('should load without critical errors', () => {
    cy.visit('/');
    cy.window().then((win) => {
      const errors = [];
      cy.stub(win.console, 'error').callsFake((message) => {
        if (typeof message === 'string' && message.includes('Error')) {
          errors.push(message);
        }
      });
      // Wait a bit for any initial errors
      cy.wait(2000).then(() => {
        expect(errors.length).to.be.lessThan(3); // Allow some warnings but not many errors
      });
    });
  });

  it('should be responsive to viewport changes', () => {
    cy.visit('/');
    
    // Test mobile view
    cy.viewport('iphone-6');
    cy.get('body').should('be.visible');
    
    // Test desktop view
    cy.viewport('macbook-15');
    cy.get('body').should('be.visible');
    
    // Content should be visible in both views
    cy.contains(/book/i).should('be.visible');
  });
});
