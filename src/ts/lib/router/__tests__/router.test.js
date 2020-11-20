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

describe('тестирование компонента Router', () => {
    let router = new Router('.app', []);

    test('должен добавиться _rootQuery', () => {
        expect(router._rootQuery).toBe('.app');
    });

    test('должен создаться routes', () => {
        expect(router.routes.length).toBe(0);
    });

    test('должен добавить 1 роут при вызове метода use', () => {
        router.use('/', {});
        expect(router.routes.length).toBe(1);
    });

    test('проверяем 1 роут при вызове метода start', () => {
        router.start();
        expect(router.routes.length).toBe(1);
    });

})

