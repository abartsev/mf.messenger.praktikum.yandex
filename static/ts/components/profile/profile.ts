import { Block, IBlock } from '../../lib/block.js';
import { IContext } from '../interface.js';

export class Profile extends Block {

    props: IContext;
    validateForm: {[index: string]: IBlock} = {};
    temp: string;
    _rootTag: string;
    _root: HTMLElement;
    constructor(tag:string, className: string[], props: IContext, template: string) {
        super(tag, className, props, template);
        this.temp = template;
    }

    componentDidMount () {
         
    }

    handleSubmit = (e: HTMLFormElement | any): void => {
       
    }


    render() {
        if (!this._root) {
            this._root = document.querySelector('.main') as HTMLElement; 
            this._root.appendChild(this.getContent());
        }

        return this._template;
    }
}