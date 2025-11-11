// cypress/e2e/early-stage.cy.js
describe('Early Stage Application Tests', () => {
  it('should load the application', () => {
    cy.visit('/', { failOnStatusCode: false })
    cy.get('body').should('exist')
  })

  it('should have some content', () => {
    cy.visit('/')
    cy.get('body').then(($body) => {
      expect($body.text().length).to.be.greaterThan(0)
    })
  })

  it('should handle different viewports', () => {
    cy.visit('/')
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ]
    
    viewports.forEach(viewport => {
      cy.viewport(viewport.width, viewport.height)
      cy.get('body').should('be.visible')
    })
  })
})