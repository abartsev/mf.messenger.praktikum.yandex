import { Block } from '../../lib/block.js';
export class ValidateForm extends Block {
    constructor(props) {
        super(props);
        return this;
    }
    render() {
        return {
            tag: 'span',
            class: 'error_msg',
            text: this.props.text
        };
    }
}
//# sourceMappingURL=validate-form.js.map