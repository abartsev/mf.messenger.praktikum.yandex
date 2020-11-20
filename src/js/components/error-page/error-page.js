import { Block } from '../../lib/block.js';
import { Link } from '../common/link/link.js';
import { Router } from '../../lib/router/router.js';
export class ErrorPage extends Block {
    constructor(store) {
        super({ error: store.error });
        this.handleClickLink = () => {
            this.router.go('#chat');
        };
        this.router = new Router('.app', store.routers);
    }
    componentDidMount() {
        var _a;
        this._link = document.querySelector('[data-on-click]');
        (_a = this._link) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.handleClickLink);
    }
    render() {
        return {
            tag: 'div',
            class: 'error__block',
            children: [
                {
                    tag: 'div',
                    class: 'error__circle',
                    children: [
                        {
                            tag: 'h3',
                            class: 'error__block__title',
                            text: this.props.error.title
                        },
                        {
                            tag: 'p',
                            class: 'error__block__text',
                            text: this.props.error.description
                        }
                    ],
                    childNode: new Link({ className: 'error__block__link', text: 'Назад к чатам', attr: { onClick: 'onClick' } })
                }
            ]
        };
    }
}
//# sourceMappingURL=error-page.js.map