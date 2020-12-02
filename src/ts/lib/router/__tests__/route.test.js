import {Route} from '../route.ts';

describe('tests Route', () => {
	const block = {};
	const props = {};
	let route = new Route('.app', block, props);

	it('должен создаться _pathname', () => {
		expect(route._pathname).toBe('.app');
	});

	it('должен создаться block', () => {
		expect(route._block).toBe(block);
	});

	it('должен создаться props', () => {
		expect(route._props).toBe(props);
	});
});

