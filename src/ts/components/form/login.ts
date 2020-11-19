import { Button } from './../common/button/button';
import { Link } from './../common/link/link';
import { Block, IBlock } from '../../lib/block';
import { Router, IRouter } from '../../lib/router/router';
import { ValidateForm } from '../helper/validate-form';
import { Auth, IAuth } from '../../api/auth';

export class Login extends Block {
    _link: HTMLElement | null;
    _btn: HTMLElement | null;
    _arrInputs: NodeList | any;
    router: IRouter;
    validate: {[index: string]:IBlock};
    api: IAuth;
    constructor (store: any) {
        super({login: '', password: ''});
        this.router = new Router('.app', store.routers);
        this.api = new Auth();
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
        this.router.go('/signin');
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
            let resp: Promise<any> = this.api.post('signin', this.props);
            resp
                .then(json => {
                    console.log(json);
                    
                    if (json.response) {
                        this.router.go('/chat');
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
                                    childNode: new Button({className: 'form__item__button', text: 'Авторизоваться', attr: {onSubmit: 'onSubmit'}}) 
                                },
                                {
                                    tag: 'div',
                                    class: 'form__item', 
                                    childNode: new Link({className: 'form__item__link', text: 'Нет аккаунта?', attr: {onClick: 'onClick'}})
                                }
                            ]
                        }
                    ]
                
                }
            ]
        }
        
    }

}
