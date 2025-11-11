// cypress/e2e/ci-homepage.cy.js
describe('Homepage - CI Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load homepage successfully', () => {
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('body').should('be.visible')
  })

  it('should have visible content', () => {
    cy.get('body').then(($body) => {
      expect($body.text().length).to.be.greaterThan(0)
    })
  })

  it('should have navigation elements', () => {
    cy.get('a, button, nav, header').should('exist')
  })

  it('should support basic interactions', () => {
    cy.get('button, a').first().click({ force: true })
    cy.get('body').should('be.visible') // Page should still work
  })
})