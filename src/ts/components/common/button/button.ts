import { Block } from '../../../lib/block.js';
import { IContext } from '../../interface.js';

export class Button extends Block {

    props: IContext;
    constructor(className: string[], props: IContext) {
        super('button', className, props);
    }

    render() {
        return '{{text}}';
    }
}
