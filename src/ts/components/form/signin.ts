import { Button } from './../common/button/button';
import { Link } from './../common/link/link';
import { Block, IBlock } from '../../lib/block';
import { Router, IRouter } from '../../lib/router/router';
import { ValidateForm } from '../helper/validate-form';
import { Auth, IAuth } from '../../api/auth';

export class Signin extends Block {
    _link: HTMLElement | null;
    _btn: HTMLElement | null;
    _arrInputs: NodeList | any;
    router: IRouter;
    validate: {[index: string]:IBlock};
    api: IAuth;
    changeStore: (path: string, data: any) => void;
    constructor (store: any, changeStore: (path: string, data: any) => void) {
        super({first_name: '', second_name: '', login: '', email: '', password: '', phone: ''});
        this.router = new Router('.app', store.routers);
        this.api = new Auth();
        this.changeStore = changeStore;
    }

    componentDidMount() {
        this._link = document.querySelector('[data-on-click]');
        this._btn = document.querySelector('[data-on-submit]');
        this._arrInputs = document.querySelectorAll('[data-on-blur]');
        this._link?.addEventListener('click', this.handleClickLink);
        this._btn?.addEventListener('click', this.handleSubmit);

        Array.from(this._arrInputs).map((e: HTMLInputElement) => {
            this.validate = {...this.validate, [e.name]: new ValidateForm({text: ''})};
            e?.addEventListener('blur', this.handleBlur);
            e?.addEventListener('input', this.handleChange);
        })
    }

    handleClickLink = () => {
        this.router.go('/');
    }

    handleBlur = (e: HTMLElement | any): void => {
        if (!e.target.value) {
            this.validate[e.target.name].props.text = 'Поле обязательно для заполнения';
            e.target.closest('div').appendChild(this.validate[e.target.name]._element);
        }
        
    }

    handleSubmit = (e: HTMLElement | any) => {
        e.preventDefault();
        let arrError: string[] = [];
        for (const key in this.props) {
            if (Object.prototype.hasOwnProperty.call(this.props, key)) {
                const element = this.props[key];
                if (!element){
                    arrError.push(key);
                }
            }
        }

        if (arrError.length) {
            Array.from(this._arrInputs).map((e: HTMLInputElement | any) => {
               if (arrError.includes(e.name)) {
                this.validate[e.name].props.text = 'Поле обязательно для заполнения';
                e.closest('div').appendChild(this.validate[e.name]._element);
               }
            })
        } else {
            let res: Promise<any> = this.api.post('signup', this.props);

            res
                .then(json => {
                    if (json.response) {
                        this.changeStore('profile', {...JSON.parse(json.response), ...this.props});
                        this.router.go('/');
                    }
                })
        }
    }

    handleChange = (e: HTMLElement | any) => {

        if (this.validate[e.target.name].props.text) {
            this.validate[e.target.name]._element.remove();
            this.validate[e.target.name].props.text = ''; 
        }
        this.props[e.target.name] = e.target.value;
    }

    render () {
        return {
            tag: 'div',
            class: 'layout_type_modal',
            children: [
                {
                    tag: 'form',
                    class: 'form',
                    children: [
                        {
                            tag: 'header',
                            class: 'form__items,form__header',
                            children: [
                                {
                                    tag: 'h3',
                                    class: 'form__header__text',
                                    text: 'Регистрация'
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
                                            text: 'Имя'
                                        },
                                        {
                                            tag: 'input',
                                            class: 'form__item__input',
                                            options: {
                                                type: 'text',
                                                name: 'first_name'
                                            },
                                            value: 'first_name',
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
                                            text: 'Фамилия'
                                        },
                                        {
                                            tag: 'input',
                                            class: 'form__item__input',
                                            options: {
                                                type: 'text',
                                                name: 'second_name'
                                            },
                                            value: 'second_name',
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
                                            text: 'Логин' 
                                        },
                                        {
                                            tag: 'input',
                                            class: 'form__item__input',
                                            options: {
                                                type: 'text',
                                                name: 'login'
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
                                            text: 'Почта'
                                        },
                                        {
                                            tag: 'input',
                                            class: 'form__item__input',
                                            options: {
                                                type: 'email',
                                                name: 'email'
                                            },
                                            value: 'email',
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
                                },
                                {
                                    tag: 'div',
                                    class: 'form__item',
                                    children: [
                                        {
                                            tag: 'label',
                                            class: 'form__item__label',
                                            text: 'Телефон' 
                                        },
                                        {
                                            tag: 'input',
                                            class: 'form__item__input', 
                                            options: {
                                                type: 'text',
                                                name: 'phone'
                                            },
                                            value: 'phone',
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
                                    childNode: new Button({link: '/', className: 'form__item__button', text: 'Зарегистрироваться', attr: {onSubmit: 'onSubmit'}}) 
                                },
                                {
                                    tag: 'div',
                                    class: 'form__item', 
                                    childNode: new Link({className: 'form__item__link', text: 'Войти', attr: {onClick: 'onClick'}})
                                }
                            ]
                        }
                    ]
                
                }
            ]
        }
        
    }

}