import { Block } from '../../lib/block.js';
import { IContext } from '../types.js';

export class ValidateForm extends Block {

    props: IContext;
    constructor(props: IContext) {
        super('span', ['error_msg'] ,props);
    }

    render() {
        return '{{text}}';
    }
}

  
