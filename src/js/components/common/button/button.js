import { Block } from '../../../lib/block.js';
export class Button extends Block {
    constructor(className, props) {
        super('button', className, props);
    }
    render() {
        return '{{text}}';
    }
}
//# sourceMappingURL=button.js.map