import { Button } from './../common/button/button.js';
import { Link } from './../common/link/link.js';
import { Block } from '../../lib/block.js';
import { Router } from '../../lib/router/router.js';
import { ValidateForm } from '../helper/validate-form.js';
import { Auth } from '../../api/auth.js';
export class Login extends Block {
    constructor(store) {
        super({ login: '', password: '' });
        this.handleClickLink = () => {
            this.router.go('/signin');
        };
        this.handleBlur = (e) => {
            if (!e.target.value) {
                this.validate[e.target.name].props.text = 'Поле обязательно для заполнения';
                e.target.closest('div').appendChild(this.validate[e.target.name]._element);
            }
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            let arrError = [];
            for (const key in this.props) {
                if (Object.prototype.hasOwnProperty.call(this.props, key)) {
                    const element = this.props[key];
                    if (!element) {
                        arrError.push(key);
                    }
                }
            }
            if (arrError.length) {
                Array.from(this._arrInputs).map((e) => {
                    if (arrError.includes(e.name)) {
                        this.validate[e.name].props.text = 'Поле обязательно для заполнения';
                        e.closest('div').appendChild(this.validate[e.name]._element);
                    }
                });
            }
            else {
                let resp = this.api.post('signin', this.props);
                resp
                    .then(json => {
                    console.log(json);
                    if (json.response) {
                        this.router.go('/chat');
                    }
                });
            }
        };
        this.handleChange = (e) => {
            if (this.validate[e.target.name].props.text) {
                this.validate[e.target.name]._element.remove();
                this.validate[e.target.name].props.text = '';
            }
            this.props[e.target.name] = e.target.value;
        };
        this.router = new Router('.app', store.routers);
        this.api = new Auth();
    }
    componentDidMount() {
        var _a, _b;
        this._link = document.querySelector('[data-on-click]');
        this._btn = document.querySelector('[data-on-submit]');
        this._arrInputs = document.querySelectorAll('[data-on-blur]');
        (_a = this._link) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.handleClickLink);
        (_b = this._btn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.handleSubmit);
        Array.from(this._arrInputs).map((e) => {
            this.validate = Object.assign(Object.assign({}, this.validate), { [e.name]: new ValidateForm({ text: '' }) });
            e === null || e === void 0 ? void 0 : e.addEventListener('blur', this.handleBlur);
            e === null || e === void 0 ? void 0 : e.addEventListener('input', this.handleChange);
        });
    }
    render() {
        return {
            tag: 'div',
            class: 'layout_type_modal',
            children: [
                {
                    tag: 'form',
                    class: 'form,form__submit',
                    children: [
                        {
                            tag: 'header',
                            class: 'form__items,form__header',
                            children: [
                                {
                                    tag: 'h3',
                                    class: 'form__header__text',
                                    text: 'Вход'
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            class: 'form__items,form__body',
                            children: [
                                {
                                    tag: 'div',
                                    class: 'form__item',
                                    children: [
                                        {
                                            tag: 'label',
                                            class: 'form__item__label',
                                            text: 'Логин'
                                        },
                                        {
                                            tag: 'input',
                                            class: 'form__item__input',
                                            options: {
                                                type: 'name',
                                                name: 'login',
                                            },
                                            value: 'login',
                                            attr: {
                                                onBlur: 'ok'
                                            }
                                        }
                                    ]
                                },
                                {
                                    tag: 'div',
                                    class: 'form__item',
                                    children: [
                                        {
                                            tag: 'label',
                                            class: 'form__item__label',
                                            text: 'Пароль'
                                        },
                                        {
                                            tag: 'input',
                                            class: 'form__item__input',
                                            options: {
                                                type: 'password',
                                                name: 'password'
                                            },
                                            value: 'password',
                                            attr: {
                                                onBlur: 'ok'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            class: 'form__items,form__footer',
                            children: [
                                {
                                    tag: 'div',
                                    class: 'form__item',
                                    childNode: new Button({ className: 'form__item__button', text: 'Авторизоваться', attr: { onSubmit: 'onSubmit' } })
                                },
                                {
                                    tag: 'div',
                                    class: 'form__item',
                                    childNode: new Link({ className: 'form__item__link', text: 'Нет аккаунта?', attr: { onClick: 'onClick' } })
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=login.js.map