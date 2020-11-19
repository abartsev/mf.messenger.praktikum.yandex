import { Block } from '../../../lib/block.js';
export class Link extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        return {
            tag: 'a',
            class: this.props.className,
            text: this.props.text,
            attr: this.props.attr
        };
    }
}
//# sourceMappingURL=link.js.map