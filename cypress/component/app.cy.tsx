import Page from '../../src/app/page';
import Calculator from '../../src/app/calculator/page';

describe('<Page />', () => {
	it('should render and display expected content', () => {
		cy.mount(<Page />);

		cy.get('h1').contains('Home');

		cy.get('a[href="/calculator"]').should('be.visible');
		cy.get('a[href="/weather"]').should('be.visible');
	});
});

describe('<Calculator />', () => {
	it('number buttons should be enabled and symbol buttons should be disabled', () => {
		cy.mount(<Calculator />);
		cy.get('input.number-btn').should('not.be.disabled');
		cy.get('input.symbol-btn').should('be.disabled');
	});

	it('after one click symbol buttons should be enabled', () => {
		cy.mount(<Calculator />);
		cy.get('input.number-btn').eq(1).should('have.value', '1').click();
		cy.get('input.symbol-btn').should('not.be.disabled');
	});

	it('should add 1 to 2 and block number buttons after calculate', () => {
		cy.mount(<Calculator />);
		cy.get('input.number-btn').eq(1).should('have.value', '1').click();
		cy.get('input.symbol-btn').eq(0).should('have.value', '+').click();
		cy.get('input.number-btn').eq(2).should('have.value', '2').click();
		cy.get('input.symbol-btn').eq(5).should('have.value', '=').click();
		cy.get('input.screen').should('have.value', '3');
		cy.get('input.number-btn').should('be.disabled');
	});

	it('should write 9 on screen and sqrt it then write + try to another sqrt and show error', () => {
		cy.mount(<Calculator />);
		cy.get('input.number-btn').eq(9).should('have.value', '9').click();
		cy.get('input.symbol-btn').eq(6).should('have.value', '√').click();
		cy.get('input.screen').should('have.value', '3');
		cy.get('input.symbol-btn').eq(1).should('have.value', '-').click();
		cy.get('input.symbol-btn').eq(6).should('have.value', '√').click();
		cy.get('input.screen').should('have.value', 'You blocked it.. Click C!');
		cy.get('input.number-btn').should('be.disabled');
		cy.get('input.symbol-btn').should('be.disabled');
	});

	it('should write 1+1 and clear it but C button', () => {
		cy.mount(<Calculator />);
		cy.get('input.number-btn').eq(1).should('have.value', '1').click();
		cy.get('input.symbol-btn').eq(0).should('have.value', '+').click();
		cy.get('input.number-btn').eq(1).should('have.value', '1').click();
		cy.get('input.clear').click();
		cy.get('input.screen').should('have.value', '');
		cy.get('input.symbol-btn').should('be.disabled');
	});
	it('should check home button visiblity', () => {
		cy.mount(<Calculator />);
		cy.get('a[href="/"]').should('be.visible');
	});
});
