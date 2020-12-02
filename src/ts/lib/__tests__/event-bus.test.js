import {EventBus} from '../event-bus.ts';

describe('tests EventBus', () => {
	let event_bus = new EventBus('.app', []);

	test('should on, emit', () => {
		let mockFn = jest.fn();
		event_bus.on('TEST', mockFn);
		expect(event_bus.listeners.TEST.length).toBe(1);
		event_bus.emit('TEST');
		expect(mockFn).toBeCalled();
		event_bus.off('TEST', mockFn);
		expect(event_bus.listeners.TEST.length).toBe(0);
	});
});
