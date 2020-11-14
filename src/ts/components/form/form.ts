import { Router, IRouter } from './../../lib/router/router.js';
import { Block, IBlock } from '../../lib/block.js';
import { IContext } from '../types.js';
import { ValidateForm } from '../helper/validate-form.js';

export class Form extends Block {

    props: IContext;
    validateForm: {[index: string]: IBlock} = {};
    temp: string;
    router: IRouter;
    _root: HTMLElement;
    constructor(props: IContext, template: string) {
        super('div', ['layout_type_modal'], props, template);
        this.temp = template;
        this.router = new Router('.app'); 
    }

    componentDidMount () {
        Object.keys(this.props).forEach((e: string) => {
          
            const field: HTMLInputElement | null  = document.querySelector(`.${e}`);
  
            if (field) {
                if (e.includes('submit')) {
                    field.addEventListener('submit', this.handleSubmit);
                } else {
                    this.validateForm[e] = new ValidateForm({text: ""});
                    field.after(this.validateForm[e].element);
                    field.addEventListener('blur', this.handleBlur);
                }
            }           
        })  
    }

    handleSubmit = (e: HTMLFormElement | any): void => {
       e.preventDefault();
       Array.from(e.target.elements).forEach((elem: HTMLInputElement) => {
            if (elem.name && !elem.value) {
                this.validateForm[elem.name].setProps({text: 'Поле обязательно для заполнения'});
            } else if (elem.name && elem.value) {
                this.validateForm[elem.name].setProps({text: ''});
            }
        })
    }

    handleBlur = (e: {target: any}): void => {
        if (!e.target.value) {
            this.validateForm[e.target.name].setProps({text: 'Поле обязательно для заполнения'});
        } else {
            this.validateForm[e.target.name].setProps({text: ''});
        }
    }

    render() {
        return this._template;
    }
}