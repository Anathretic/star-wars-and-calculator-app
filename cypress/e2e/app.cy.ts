describe('Main Page Navigation - Star Wars', () => {
	it('should navigate to the star wars app', () => {
		cy.visit('http://localhost:3000/');

		cy.get('a[href*="star-wars"]').click();

		cy.url().should('include', 'star-wars');

		cy.get('h1').contains('Star Wars');
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

		cy.get('a[href="/calculator"]').should('be.visible');
		cy.get('a[href="/star-wars"]').should('be.visible');
	});
});
