import { Block } from '../../../lib/block.js';
import { IContext } from '../../types.js';
import { Router, IRouter } from '../../../lib/router/router.js';

export class Link extends Block {

    props: IContext;
    router: IRouter;
    constructor(tag: string, className: string[], props: IContext) {
        super(tag, className, props);

        this.router = new Router('.app'); 
        this._element.addEventListener('click', () => {
            console.log('dededed');
            this.handleClick('/')
          })
    }
 
    handleClick = (props: string) => (e: {preventDefault: ()=>void}): void => {
        e.preventDefault();
        console.log(e);
        this.router.go(props, this._history);
    }

    render() {
        return '{{text}}';
    }
}
