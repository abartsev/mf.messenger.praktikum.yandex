import { Block, IBlock } from '../../lib/block.js';
import { IContext } from '../interface.js';
import { ValidateForm } from '../helper/validate-form.js';

export class Form extends Block {

    props: IContext;
    validateForm: {[index: string]: IBlock} = {};
    temp: string;
    _root: HTMLElement;
    constructor(props: IContext, template: string) {
        super("div", ['layout_type_modal'], props, template);
        this.temp = template;
    }

    componentDidMount () {
        Object.keys(this.props).forEach((e: string) => {
            if (e.includes('submit')) {
                const field: HTMLInputElement | null  = document.querySelector(`.${e}`);
                
                if (field) {
                    field.addEventListener("submit", this.handleSubmit);
                } 
            } else {
                const field: HTMLInputElement | null  = document.querySelector(`.${e}`);
                if (field) {
                    this.validateForm[e] = new ValidateForm({text: ""});
                    field.after(this.validateForm[e].element);
                    field.addEventListener("blur", this.handleBlur);
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
        if (!this._root) {
            this._root = document.querySelector('.main') as HTMLElement; 
            this._root.appendChild(this.getContent());
        }

        return this._template;
    }
}