import {Block} from '../block.ts';

jest.mock('../event-bus', () => {
	return {
		EventBus: jest.fn().mockImplementation(() => {
			return {
				on: jest.fn(),
				emit: jest.fn()
			};
		})
	};
});

describe('tests Block', () => {
	const props = {test: '1'};

	test('should add _props', () => {
		let block = new Block(props);
		expect(block.props.test).toBe('1');
	});

	test('should componentDidUpdate', () => {
		let block = new Block(props);
		let test = block.componentDidUpdate({test: 1}, {test: 1});
		expect(test).toBeTruthy();
	});
});
