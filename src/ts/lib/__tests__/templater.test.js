import { Templator } from '../templater.ts';

describe('tests Templator', () => {
    let templater = new Templator('.app', []);

    test('should compile', () => {
        let teg = templater.compile({tag: 'div', text: 1}, {text: 1})
        expect(teg.innerHTML).toBe('1');
    });

})

