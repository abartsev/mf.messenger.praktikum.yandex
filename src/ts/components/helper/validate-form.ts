import { Block } from '../../lib/block.js';
import { IContext } from '../interface.js';

export class ValidateForm extends Block {

    props: IContext;
    constructor(props: IContext) {
        super('span', ['error_msg'] ,props);
    }

    render() {
        return '{{text}}';
    }
}

  
