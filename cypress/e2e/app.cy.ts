describe('Main Page Navigation - Weather', () => {
	it('should navigate to the weather page', () => {
		cy.visit('http://localhost:3000/');

		cy.get('a[href*="weather"]').click();

		cy.url().should('include', 'weather');

		cy.get('h1').contains('Weather');
	});
});

describe('Main Page Navigation - Calculator', () => {
	it('should navigate to the calculator page', () => {
		cy.visit('http://localhost:3000/');

		cy.get('a[href*="calculator"]').click();

		cy.url().should('include', 'calculator');

		cy.get('h1').contains('Calculator');
	});
});

describe('Calculator Home Button', () => {
	it('should navigate to the homepage', () => {
		cy.visit('http://localhost:3000/calculator');

		cy.get('a[href*="/"]').click();

		cy.url().should('include', '');

		cy.get('h1').contains('Home');
	});
});
