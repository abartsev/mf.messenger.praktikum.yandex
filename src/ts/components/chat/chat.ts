import { Block, IBlock } from '../../lib/block.js';
import { IContext } from '../types.js';

export class Chat extends Block {

    props: IContext;
    validateForm: {[index: string]: IBlock} = {};
    temp: string;
    _rootTag: string;
    _root: HTMLElement;
    constructor(tag:string, className: string[], props: IContext, template: string, module?: boolean) {
        super(tag, className, props, template, module);
        this.temp = template;
    }

    componentDidMount () {
         
    }

    handleSubmit = (e: HTMLFormElement | any): void => {
       
    }


    render() {
        if (!this._root) {
            this._root = document.querySelector('.chat') as HTMLElement; 
            this._root.appendChild(this.getContent());
        }

        return this._template;
    }
}