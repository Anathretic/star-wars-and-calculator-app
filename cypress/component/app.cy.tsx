import Page from '../../src/app/page';

describe('<Page />', () => {
	it('should render and display expected content', () => {
		cy.mount(<Page />);

		cy.get('h1').contains('Home');

		cy.get('a[href="/calculator"]').should('be.visible');
		cy.get('a[href="/weather"]').should('be.visible');
	});
});
