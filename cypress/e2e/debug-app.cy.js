// cypress/e2e/debug-app.cy.js
describe('Debug Application Structure', () => {
  it('should analyze all pages', () => {
    // Test homepage
    cy.visit('/')
    console.log('=== HOMEPAGE ANALYSIS ===')
    cy.get('body').then(($body) => {
      console.log('Homepage text:', $body.text().substring(0, 200))
    })
    cy.get('*').then(($elements) => {
      const elements = {}
      $elements.each((_, el) => {
        const tag = el.tagName.toLowerCase()
        elements[tag] = (elements[tag] || 0) + 1
      })
      console.log('Homepage elements:', elements)
    })
    cy.screenshot('homepage-debug')

    // Test catalog page
    cy.visit('/catalog')
    console.log('=== CATALOG ANALYSIS ===')
    cy.get('body').then(($body) => {
      console.log('Catalog text:', $body.text().substring(0, 200))
    })
    cy.screenshot('catalog-debug')

    // Test cart page
    cy.visit('/cart')
    console.log('=== CART ANALYSIS ===')
    cy.get('body').then(($body) => {
      console.log('Cart text:', $body.text().substring(0, 200))
    })
    cy.screenshot('cart-debug')

    // Test checkout page
    cy.visit('/checkout')
    console.log('=== CHECKOUT ANALYSIS ===')
    cy.get('body').then(($body) => {
      console.log('Checkout text:', $body.text().substring(0, 200))
      console.log('All inputs:', $body.find('input, select, textarea').length)
    })
    cy.screenshot('checkout-debug')
  })

  it('should find all buttons and links', () => {
    cy.visit('/')
    cy.get('button, a, [role="button"]').each(($el, index) => {
      const text = $el.text().trim()
      const classes = $el.attr('class') || 'no-classes'
      console.log(`${index + 1}. ${$el.prop('tagName')}: "${text}" | classes: ${classes}`)
    })
  })
})