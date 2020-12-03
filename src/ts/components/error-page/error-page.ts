import {Block} from '../../lib/block';
import {Link} from '../common/link/link';
import {Router, IRouter} from '../../lib/router/router';
import './error-page.css';

export class ErrorPage extends Block {
    _link: HTMLElement | null;
    router: IRouter;
    constructor(store: any) {
    	super({error: store.error});
    	this.router = new Router('.app', store.routers);
    }

    componentDidMount() {
    	this._link = document.querySelector('[data-on-click]');
    	this._link?.addEventListener('click', this.handleClickLink);
    }

    handleClickLink = () => {
    	this.router.go('#chat');
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
    				childNode: new Link({
    					className: 'error__block__link',
    					text: 'Назад к чатам',
    					attr: {onClick: 'onClick'}})
    			}
    		]
    	};
    }
}
