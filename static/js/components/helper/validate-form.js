import { Block } from '../../lib/block.js';
export class ValidateForm extends Block {
    constructor(props) {
        super("span", ["error_msg"], props);
    }
    render() {
        return `{{text}}`;
    }
}
//# sourceMappingURL=validate-form.js.map