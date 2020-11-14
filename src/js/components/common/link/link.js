import { Block } from '../../../lib/block.js';
import { Router } from '../../../lib/router/router.js';
export class Link extends Block {
    constructor(tag, className, props) {
        super(tag, className, props, '', false, true);
        this.handleClick = (props) => (e) => {
            e.preventDefault();
            console.log(e);
            this.router.go(props, this._history);
        };
        this.router = new Router('.app');
        this._element.addEventListener('click', () => {
            console.log('dededed');
            this.handleClick('/');
        });
    }
    render() {
        return '{{text}}';
    }
}
//# sourceMappingURL=link.js.map