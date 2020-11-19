import { Block } from '../../lib/block.js';
import { Button } from '../common/button/button.js';
import { Router } from '../../lib/router/router.js';
export class Profile extends Block {
    constructor(store) {
        super({ profile: store.profile });
        this.handleClickBack = () => {
            this.router.go('/chat');
        };
        this.handleClickChange = () => {
            this.router.go('/profile-edit');
        };
        this.handleClickExit = () => {
            this.router.go('/chat');
        };
        this.router = new Router('.app', store.routers);
    }
    componentDidMount() {
        var _a, _b, _c;
        this._back = document.querySelector('[data-on-back]');
        this._linkChange = document.querySelector('[data-on-change]');
        this._linkExit = document.querySelector('[data-on-exit]');
        (_a = this._back) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.handleClickBack);
        (_b = this._linkChange) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.handleClickChange);
        (_c = this._linkExit) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.handleClickExit);
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
                            attr: { onBack: 'onBack' }
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
                                    childNode_0: new Button({ className: 'btn__link,profile__form__footer__btn', text: 'Изменить данные', attr: { onChange: 'onChange' } }),
                                    childNode_1: new Button({ className: 'btn__link,profile__form__footer__btn,btn__link_color_red', text: 'Выйти', attr: { onExit: 'onExit' } })
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=profile.js.map