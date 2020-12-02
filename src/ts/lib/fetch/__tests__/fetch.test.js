import {HTTPTransport} from '../fetch.ts';

describe('test component HTTPTransport', () => {
	it('should add baseurl', () => {
		let http = new HTTPTransport('http://test.ru');
		const spy = jest.spyOn(http, 'request');
		expect(http.url).toBe('http://test.ru');
	});

	it('test get', () => {
		let http = new HTTPTransport('http://test.ru');
		const spy = jest.spyOn(http, 'request');
		http.get('/test');
		expect(spy).toBeCalled();
	});
	it('test post', () => {
		let http = new HTTPTransport('http://test.ru');
		const spy = jest.spyOn(http, 'request');
		http.post('/test');
		expect(spy).toBeCalled();
	});
	it('test delete', () => {
		let http = new HTTPTransport('http://test.ru');
		const spy = jest.spyOn(http, 'request');
		http.delete('/test');
		expect(spy).toBeCalled();
	});
	it('test put', () => {
		let http = new HTTPTransport('http://test.ru');
		const spy = jest.spyOn(http, 'request');
		http.put('/test');
		expect(spy).toBeCalled();
	});
});
