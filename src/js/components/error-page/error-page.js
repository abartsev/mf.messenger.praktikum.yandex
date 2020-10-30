import { Block } from '../../lib/block.js';
export class ErrorPage extends Block {
    constructor(tag, className, props, template) {
        super(tag, className, props, template);
        this.validateForm = {};
        this.handleSubmit = (e) => {
        };
        this.temp = template;
    }
    componentDidMount() {
    }
    render() {
        if (!this._root) {
            this._root = document.querySelector('.main');
            this._root.appendChild(this.getContent());
        }
        return this._template;
    }
}
//# sourceMappingURL=error-page.js.map