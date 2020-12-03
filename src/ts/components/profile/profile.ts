import {Block} from '../../lib/block';
import {Button} from '../common/button/button';
import {Auth, IAuth} from '../../api/auth';
import {Router, IRouter} from '../../lib/router/router';
import './profile.css';

export class Profile extends Block {
    _back: HTMLElement | null;
    _linkChange: HTMLElement | null;
    _linkExit: HTMLElement | null;
    router: IRouter;
    api: IAuth;
    constructor(store: any) {
    	super({profile: store.profile});
    	this.router = new Router('.app', store.routers);
    	this.api = new Auth();
    }

    componentDidMount() {
    	this._back = document.querySelector('[data-on-back]');
    	this._linkChange = document.querySelector('[data-on-change]');
    	this._linkExit = document.querySelector('[data-on-exit]');
    	this._back?.addEventListener('click', this.handleClickBack);
    	this._linkChange?.addEventListener('click', this.handleClickChange);
    	this._linkExit?.addEventListener('click', this.handleClickExit);
    }

    handleClickBack = () => {
    	this.router.go('#chat');
    }

    handleClickChange = () => {
    	this.router.go('#profile-edit');
    }

    handleClickExit = () => {
    	this.api
    		.logout()
    		.then((res: any) => {
    			if (res.response === 'OK') {
    				this.router.go('#login');
    			}
    		});
    }

    render() {
    	return {
    		tag: 'div',
    		class: 'profile',
    		children: [
    			{
    				tag: 'div',
    				class: 'link__back',
    				children: [
    					{
    						tag: 'div',
    						class: 'circle__btn,circle__btn_type_left',
    						attr: {onBack: 'onBack'}
    					}
    				]
    			},
    			{
    				tag: 'div',
    				class: 'profile__body',
    				children: [
    					{
    						tag: 'div',
    						class: 'profile__form',
    						children: [
    							{
    								tag: 'div',
    								class: 'profile__form__logo',
    								children: [
    									{
    										tag: 'span',
    										class: 'profile__form__logo__img'
    									},
    									{
    										tag: 'span',
    										class: 'profile__form__logo__name',
    										text: this.props.profile.name
    									}
    								]
    							},
    							{
    								tag: 'div',
    								class: 'profile__form__info',
    								children: [
    									{
    										tag: 'div',
    										class: 'profile__form__info__item',
    										children: [
    											{
    												tag: 'span',
    												class: 'profile__form__info__item-field',
    												text: 'Почта'
    											},
    											{
    												tag: 'span',
    												class: 'profile__form__info__item-value',
    												text: this.props.profile.email
    											}
    										]
    									},
    									{
    										tag: 'div',
    										class: 'profile__form__info__item',
    										children: [
    											{
    												tag: 'span',
    												class: 'profile__form__info__item-field',
    												text: 'Логин'
    											},
    											{
    												tag: 'span',
    												class: 'profile__form__info__item-value',
    												text: this.props.profile.login
    											}
    										]
    									}
    								]
    							},
    							{
    								tag: 'div',
    								class: 'profile__form__footer',
    								childNode0: new Button({
    									className: 'btn__link,profile__form__footer__btn',
    									text: 'Изменить данные',
    									attr: {onChange: 'onChange'}
    								}),
    								childNode1: new Button({
    									className: 'btn__link,profile__form__footer__btn,btn__link_color_red',
    									text: 'Выйти',
    									attr: {onExit: 'onExit'}
    								})
    							}
    						]
    					}
    				]
    			}
    		]
    	};
    }
}
