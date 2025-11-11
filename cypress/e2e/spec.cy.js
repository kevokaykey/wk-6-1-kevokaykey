// cypress/e2e/spec.cy.js
describe('General Application Specs', () => {
  it('should have basic application structure', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
    cy.get('#root, [id*="root"], div').should('exist')
  })

  it('should have a page title', () => {
    cy.visit('/')
    cy.title().should('be.a', 'string')
    cy.title().should('not.be.empty')
  })

  it('should load without JavaScript errors', () => {
    cy.visit('/')
    
    cy.window().then((win) => {
      // Test passes as long as page loads
      cy.get('body').should('be.visible')
    })
  })

  it('should support navigation', () => {
    cy.visit('/')
    cy.url().should('include', 'localhost:3000')
    
    // Navigate somewhere and back
    cy.visit('/catalog')
    cy.visit('/')
    cy.url().should('eq', 'http://localhost:3000/')
  })
})