import { HTTPTransport } from '../fetch.ts';

let http = new HTTPTransport('http://test.ru');

test('test HTTPTransport', () => {
  const spy = jest.spyOn(http, 'request');
    expect(http.baseurl).toBe('http://test.ru');
});

test('test get', () => {
  const spy = jest.spyOn(http, 'request');
    http.get('/test');
    expect(spy).toBeCalled();
});
test('test post', () => {
  const spy = jest.spyOn(http, 'request');
    http.post('/test');
    expect(spy).toBeCalled();
});
test('test delete', () => {
  const spy = jest.spyOn(http, 'request');
    http.delete('/test');
    expect(spy).toBeCalled();
});
test('test put', () => {
  const spy = jest.spyOn(http, 'request');
    http.put('/test');
    expect(spy).toBeCalled();
});