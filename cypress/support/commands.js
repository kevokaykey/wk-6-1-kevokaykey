// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getBySel', (selector) => {
  // Alias to data-testid to support both patterns
  return cy.get(`[data-testid="${selector}"]`);
});

Cypress.Commands.add('login', (email, password) => {
  // Custom login command if needed later
});

Cypress.Commands.add('addBookToCart', () => {
  cy.get('[data-testid="book-buy-button"]').first().click();
});

Cypress.Commands.add('fillCheckoutForm', ({ email, name, address }) => {
  cy.getBySel('checkout-form').within(() => {
    if (email) cy.get('input[name="email"]').clear().type(email);
    if (name) cy.get('input[name="name"]').clear().type(name);
    if (address) cy.get('input[name="address"]').clear().type(address);
  });
});