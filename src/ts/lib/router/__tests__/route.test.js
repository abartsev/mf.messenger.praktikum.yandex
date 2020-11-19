import { Route } from '../route.ts';

describe('tests Route', () => {
    const block = {};
    const props = {};
    let route = new Route('.app', block, props);

    test('should add _pathname, _block, _props', () => {
        expect(route._pathname).toBe('.app');
        expect(route._block).toBe(block);
        expect(route._props).toBe(props);
    });

})

