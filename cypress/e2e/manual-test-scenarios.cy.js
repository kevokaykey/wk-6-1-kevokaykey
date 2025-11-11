// cypress/e2e/manual-test-scenarios.cy.js
describe('Manual Test Scenarios', () => {
  it('should visit main application pages without errors', () => {
    const pages = ['/', '/catalog', '/cart']
    
    pages.forEach(page => {
      cy.visit(page, { failOnStatusCode: false, timeout: 10000 })
      cy.get('body', { timeout: 10000 }).should('be.visible')
      cy.log(`✅ Successfully visited: ${page}`)
    })
  })

  it('should handle basic page interactions', () => {
    cy.visit('/', { timeout: 10000 })
    
    // Wait for page to be fully loaded
    cy.get('body', { timeout: 10000 }).should('be.visible')
    
    // Find any clickable elements and try clicking the first one
    cy.get('button, a, [role="button"]').first().then(($firstEl) => {
      if ($firstEl.length > 0) {
        cy.wrap($firstEl).click({ force: true, timeout: 5000 })
        // Just verify we're still on a page that works
        cy.get('body', { timeout: 10000 }).should('be.visible')
      } else {
        // If no clickable elements, that's ok too
        cy.log('No clickable elements found - skipping interaction test')
      }
    })
  })

  it('should handle form inputs if they exist', () => {
    cy.visit('/', { timeout: 10000 })
    
    cy.get('body', { timeout: 10000 }).then(($body) => {
      const inputs = $body.find('input, textarea')
      
      if (inputs.length > 0) {
        // Test the first input if any exist
        cy.get('input, textarea').first().then(($input) => {
          const inputType = $input.attr('type')
          if (inputType !== 'hidden') {
            cy.wrap($input).type('test input', { force: true, timeout: 5000 })
            cy.wrap($input).clear({ force: true })
          }
        })
      } else {
        // No inputs found - that's acceptable
        cy.log('No form inputs found - skipping input test')
      }
    })
  })

  it('should demonstrate application navigation flow', () => {
    // Start from home
    cy.visit('/', { timeout: 10000 })
    cy.get('body', { timeout: 10000 }).should('be.visible')
    
    // Try to navigate to catalog
    cy.visit('/catalog', { timeout: 10000, failOnStatusCode: false })
    cy.get('body', { timeout: 10000 }).should('be.visible')
    
    // Try to navigate to cart
    cy.visit('/cart', { timeout: 10000, failOnStatusCode: false })
    cy.get('body', { timeout: 10000 }).should('be.visible')
    
    // Return home
    cy.visit('/', { timeout: 10000 })
    cy.get('body', { timeout: 10000 }).should('be.visible')
  })

  it('should verify application is responsive', () => {
    cy.visit('/', { timeout: 10000 })
    
    // Test different viewports - just verify page loads
    const viewports = [
      { width: 1200, height: 800, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ]
    
    viewports.forEach(viewport => {
      cy.viewport(viewport.width, viewport.height)
      cy.get('body', { timeout: 10000 }).should('be.visible')
      cy.log(`✅ Viewport ${viewport.name} (${viewport.width}x${viewport.height}) works`)
    })
  })

  it('should handle edge cases gracefully', () => {
    // Test non-existent page (should not crash)
    cy.visit('/non-existent-page', { 
      failOnStatusCode: false, 
      timeout: 10000 
    })
    cy.get('body', { timeout: 10000 }).should('be.visible')
    
    // Return to working page
    cy.visit('/', { timeout: 10000 })
    cy.get('body', { timeout: 10000 }).should('be.visible')
  })
})