describe('CI: Checkout smoke test', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/books', { fixture: 'books.json' }).as('getBooks');
        cy.intercept('POST', '/api/cart', { statusCode: 200 }).as('addToCart');
        cy.visit('/');
        cy.wait('@getBooks');
    });

    it('adds an item to cart and proceeds to checkout (mocked)', () => {
            cy.getBySel('book-card').first().within(() => {
                cy.getBySel('add-to-cart').click();
            });
        cy.wait('@addToCart').its('response.statusCode').should('eq', 200);

            cy.getBySel('cart-icon').click();
        cy.url().should('include', '/cart');

            cy.getBySel('checkout-button').click();
        cy.url().should('include', '/checkout');

            cy.fillCheckoutForm({
                email: 'ci@example.com',
                name: 'CI Tester',
                address: '123 Test Lane'
            });

            // Mock payment submission: simply assert form submit is possible
            cy.getBySel('place-order').click();
            cy.getBySel('confirmation-page').should('be.visible');
    });
});
