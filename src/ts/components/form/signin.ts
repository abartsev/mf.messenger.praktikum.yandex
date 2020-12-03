/* eslint-disable camelcase */
/* eslint-disable no-multi-assign */
import {Notification} from './../helper/notification';
import {Button} from './../common/button/button';
import {Link} from './../common/link/link';
import {Block, IBlock} from '../../lib/block';
import {Router, IRouter} from '../../lib/router/router';
import {ValidateForm} from '../helper/validate-form';
import {Auth, IAuth} from '../../api/auth';
import './form.css';

export class Signin extends Block {
    _link: HTMLElement | null;
    _btn: HTMLElement | null;
    _arrInputs: NodeList | any;
    _interval: number = 3000;
    router: IRouter;
    validate: {[index: string]:IBlock};
    api: IAuth;
    changeStore: (path: string, data: any) => void;
    constructor(store: any, changeStore: (path: string, data: any) => void) {
    	super({firstName: '', secondName: '', login: '', email: '', password: '', phone: '', text: ''});
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

    	Array.from(this._arrInputs).forEach((e: HTMLInputElement) => {
    		this.validate = {...this.validate, [e.name]: new ValidateForm({text: ''})};
    		e?.addEventListener('blur', this.handleBlur);
    		e?.addEventListener('input', this.handleChange);
    	});

    	if (this.props.text) {
    		setTimeout(() => {
    			this.props.text = '';
    		}, this._interval);
    	}
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
    	let props: {[index: string]: string} = {
    		first_name: this.props.firstName,
    		second_name: this.props.secondName,
    		login: this.props.login,
    		email: this.props.email,
    		password: this.props.password,
    		phone: this.props.phone};

    	for (const key in props) {
    		if (Object.prototype.hasOwnProperty.call(props, key)) {
    			const element = props[key];
    			if (!element) {
    				arrError.push(key);
    			}
    		}
    	}

    	if (arrError.length) {
    		Array.from(this._arrInputs).forEach((e: HTMLInputElement | any): void => {
    			if (arrError.includes(e.name)) {
    				this.validate[e.name].props.text = 'Поле обязательно для заполнения';
    				e.closest('div').appendChild(this.validate[e.name]._element);
    			}
    		});
    	} else {
    		this.api
    			.signUp('signup', props)
    			.then((json: any) => {
    				if (json.status >= 300) {
    					this.props.text = JSON.parse(json.response).reason;
    				} else {
    					this.router.go('#login');
    				}
    			})
    			.catch((er: string) => {
    				this.props.text = er;
    			});
    	}
    }

    handleChange = (e: HTMLElement | any) => {
    	if (this.validate[e.target.name].props.text) {
    		this.validate[e.target.name]._element.remove();
    		this.validate[e.target.name].props.text = '';
    	}

    	setTimeout(() => {
    		const element = document.querySelector(`[name="${e.target.name}"]`) as HTMLInputElement;
    		if (element) {
    			element.focus();
    			element.selectionStart = element.selectionEnd = element.value.length;
    		}
    	}, 0);

    	this.props[e.target.name] = e.target.value;
    }

    render() {
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
    											name: 'firstName'
    										},
    										value: 'firstName',
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
    											name: 'secondName'
    										},
    										value: 'secondName',
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
    								childNode: new Button({
    									link: '/',
    									className: 'form__item__button',
    									text: 'Зарегистрироваться',
    									attr: {onSubmit: 'onSubmit'}
    								})
    							},
    							{
    								tag: 'div',
    								class: 'form__item',
    								childNode: new Link({
    									className: 'form__item__link',
    									text: 'Войти',
    									attr: {onClick: 'onClick'}
    								})
    							}
    						]
    					}
    				]

    			}
    		],
    		condition1: [this.props.text.length, '>', 0],
    		childNode: new Notification(this.props.text)
    	};
    }
}
