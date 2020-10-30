import { Block } from '../../lib/block.js';
import { ValidateForm } from '../helper/validate-form.js';
export class Form extends Block {
    constructor(props, template) {
        super('div', ['layout_type_modal'], props, template);
        this.validateForm = {};
        this.handleSubmit = (e) => {
            e.preventDefault();
            Array.from(e.target.elements).forEach((elem) => {
                if (elem.name && !elem.value) {
                    this.validateForm[elem.name].setProps({ text: 'Поле обязательно для заполнения' });
                }
                else if (elem.name && elem.value) {
                    this.validateForm[elem.name].setProps({ text: '' });
                }
            });
        };
        this.handleBlur = (e) => {
            if (!e.target.value) {
                this.validateForm[e.target.name].setProps({ text: 'Поле обязательно для заполнения' });
            }
            else {
                this.validateForm[e.target.name].setProps({ text: '' });
            }
        };
        this.temp = template;
    }
    componentDidMount() {
        Object.keys(this.props).forEach((e) => {
            const field = document.querySelector(`.${e}`);
            if (field) {
                if (e.includes('submit')) {
                    field.addEventListener('submit', this.handleSubmit);
                }
                else {
                    this.validateForm[e] = new ValidateForm({ text: "" });
                    setTimeout(() => field.after(this.validateForm[e].element), 0);
                    field.addEventListener('blur', this.handleBlur);
                }
            }
        });
    }
    render() {
        if (!this._root) {
            this._root = document.querySelector('.main');
            this._root.appendChild(this.getContent());
        }
        return this._template;
    }
}
//# sourceMappingURL=form.js.map