import { Block } from './../../lib/block.js';
export class Notification extends Block {
    constructor(props) {
        super({ text: props });
    }
    render() {
        return {
            tag: 'div',
            class: 'block__notification',
            children: [
                {
                    tag: 'span',
                    class: 'notification__text',
                    text: this.props.text
                }
            ]
        };
    }
}
//# sourceMappingURL=notification.js.map