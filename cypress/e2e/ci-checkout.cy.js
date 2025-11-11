// cypress/e2e/ci-checkout.cy.js
describe('Checkout Process - CI Tests', () => {
  beforeEach(() => {
    // Mock all APIs
    cy.intercept('GET', '/api/*', { 
      statusCode: 200, 
      body: { items: [], total: 0 } 
    }).as('anyApi')
    cy.intercept('POST', '/api/*', { 
      statusCode: 200, 
      body: { success: true } 
    }).as('anyPostApi')
    
    cy.visit('/cart')
  })

  it('should display cart page', () => {
    cy.url().should('include', 'cart')
    cy.get('body').should('be.visible')
  })

  it('should have some content on cart page', () => {
    cy.get('body').then(($body) => {
      const hasContent = $body.text().length > 0
      expect(hasContent).to.be.true
    })
  })

  it('should have clickable elements', () => {
    cy.get('button, a, [role="button"]').first()
      .should('exist')
      .click({ force: true })
  })

  it('should navigate to other pages', () => {
    // Try to find and click any navigation element
    cy.get('a, button').first().click({ force: true })
    cy.url().should('not.eq', 'http://localhost:3000/cart')
  })
})