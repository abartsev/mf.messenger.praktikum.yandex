import { Router } from '../router.ts';

jest.mock('../route', () => {
    return {
        Route: jest.fn().mockImplementation(() => {
        return {
            match: jest.fn()
        };
      })
    };
  });

describe('tests Router', () => {
    let router = new Router('.app', []);

    test('should add _rootQuery, routers', () => {
        expect(router._rootQuery).toBe('.app');
        expect(router.routes.length).toBe(0);
    });

    test('should use', () => {
        router.use('/', {});
        expect(router.routes.length).toBe(1);
    });

    test('should start', () => {
        router.start();
        expect(router.routes.length).toBe(1);
    });

})

