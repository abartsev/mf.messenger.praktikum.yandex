import { Block } from '../block.ts';

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
    let block = new Block(props);

    test('should add _props', () => {
        expect(block.props.test).toBe('1');
        expect(block.eventBus.on).toBeCalled();
    });

    test('should componentDidUpdate', () => {
        let test = block.componentDidUpdate({test: 1}, {test: 1});
        expect(test).toBeFalsy();
    })
    

})