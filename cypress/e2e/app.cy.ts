describe('Navigation', () => {
	it('should navigate to the weather page', () => {
		cy.visit('http://localhost:3000/');

		cy.get('a[href*="weather"]').click();

		cy.url().should('include', '/weather');

		cy.get('h1').contains('Weather');
	});
});

describe('Navigation', () => {
	it('should navigate to the calculator page', () => {
		cy.visit('http://localhost:3000/');

		cy.get('a[href*="calculator"]').click();

		cy.url().should('include', '/calculator');

		cy.get('h1').contains('Calculator');
	});
});
