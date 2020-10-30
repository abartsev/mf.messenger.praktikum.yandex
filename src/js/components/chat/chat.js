import { Block } from '../../lib/block.js';
export class Chat extends Block {
    constructor(tag, className, props, template, module) {
        super(tag, className, props, template, module);
        this.validateForm = {};
        this.handleSubmit = (e) => {
        };
        this.temp = template;
    }
    componentDidMount() {
    }
    render() {
        if (!this._root) {
            this._root = document.querySelector('.chat');
            this._root.appendChild(this.getContent());
        }
        return this._template;
    }
}
//# sourceMappingURL=chat.js.map