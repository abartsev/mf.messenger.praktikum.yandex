import { Block } from '../../../lib/block.js';
export class Button extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        return {
            tag: 'button',
            class: this.props.className,
            text: this.props.text,
            attr: this.props.attr
        };
    }
}
//# sourceMappingURL=button.js.map