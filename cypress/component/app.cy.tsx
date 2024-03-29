import Page from '../../src/app/page';
import Calculator from '../../src/app/calculator/page';
import StarWars from '../../src/app/star-wars/page';

describe('<Page />', () => {
	it('should render and display expected content', () => {
		cy.mount(<Page />);
		cy.get('a[href="/calculator"]').should('be.visible');
		cy.get('a[href="/star-wars"]').should('be.visible');
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
		cy.get('input.number-btn').eq(8).should('have.value', '1').click();
		cy.get('input.symbol-btn').should('not.be.disabled');
	});

	it('should add 1 to 2 and block number buttons after calculate', () => {
		cy.mount(<Calculator />);
		cy.get('input.number-btn').eq(8).should('have.value', '1').click();
		cy.get('input.symbol-btn').eq(2).should('have.value', '+').click();
		cy.get('input.number-btn').eq(7).should('have.value', '2').click();
		cy.get('input.symbol-btn').eq(6).should('have.value', '=').click();
		cy.get('input.screen').should('have.value', '3');
		cy.get('input.number-btn').should('be.disabled');
	});

	it('should write 9 on screen and sqrt it then write + try to another sqrt and show error', () => {
		cy.mount(<Calculator />);
		cy.get('input.number-btn').eq(0).should('have.value', '9').click();
		cy.get('input.symbol-btn').eq(1).should('have.value', '√').click();
		cy.get('input.screen').should('have.value', '3');
		cy.get('input.symbol-btn').eq(3).should('have.value', '-').click();
		cy.get('input.symbol-btn').eq(1).should('have.value', '√').click();
		cy.get('input.screen').should('have.value', 'You blocked it.. Click C!');
		cy.get('input.number-btn').should('be.disabled');
		cy.get('input.symbol-btn').should('be.disabled');
	});

	it('should write 1+1 and clear it but C button', () => {
		cy.mount(<Calculator />);
		cy.get('input.number-btn').eq(8).should('have.value', '1').click();
		cy.get('input.symbol-btn').eq(2).should('have.value', '+').click();
		cy.get('input.number-btn').eq(8).should('have.value', '1').click();
		cy.get('input.clear').click();
		cy.get('input.screen').should('have.value', '');
		cy.get('input.symbol-btn').should('be.disabled');
	});
	it('should check home button visiblity', () => {
		cy.mount(<Calculator />);
		cy.get('a[href="/"]').should('be.visible');
	});
});

describe('<StarWars />', () => {
	it('should people button be enabled and planets button be disabled', () => {
		cy.mount(<StarWars />);
		cy.get('button.people-button').should('be.enabled');
		cy.get('button.planets-button').should('be.disabled');
	});

	it('after on click, people button should be disabled and planets button should be enabled', () => {
		cy.mount(<StarWars />);
		cy.get('button.people-button').should('be.enabled').click();
		cy.get('button.people-button').should('be.disabled');
		cy.get('button.planets-button').should('be.enabled');
	});

	it('after on click, people button should be disabled and planets button should be enabled', () => {
		cy.mount(<StarWars />);
		cy.get('button.people-button').should('be.enabled').click();
		cy.get('button.people-button').should('be.disabled');
		cy.get('button.planets-button').should('be.enabled');
	});

	it('first displayed planet should be tatooine', () => {
		cy.mount(<StarWars />);
		cy.get('h3').eq(0).should('have.text', 'Tatooine');
		cy.get('button.people-button').should('be.enabled');
		cy.get('button.planets-button').should('be.disabled');
	});

	it('first displayed character should be luke skywalker', () => {
		cy.mount(<StarWars />);
		cy.get('button.people-button').should('be.enabled').click();
		cy.get('h3').eq(0).should('have.text', 'Luke Skywalker');
		cy.get('button.people-button').should('be.disabled');
		cy.get('button.planets-button').should('be.enabled');
	});

	it('first homeworld should be luke tatooine', () => {
		cy.mount(<StarWars />);
		cy.get('button.people-button').should('be.enabled').click();
		cy.get('input').eq(0).click();
		cy.get('input').eq(0).should('have.value', 'Tatooine');
	});
});
