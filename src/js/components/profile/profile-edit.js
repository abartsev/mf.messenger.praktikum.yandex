import { Block } from '../../lib/block.js';
import { Button } from '../common/button/button.js';
import { Router } from '../../lib/router/router.js';
export class ProfileEdit extends Block {
    constructor(store) {
        super({ profile: store.profile });
        this.handleClickSave = () => {
            this.router.go('/profile');
        };
        this.router = new Router('.app', store.routers);
    }
    componentDidMount() {
        var _a;
        this._save = document.querySelector('[data-on-save]');
        (_a = this._save) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.handleClickSave);
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
                                        },
                                        {
                                            tag: 'div',
                                            class: 'profile__form__info__item',
                                            children: [
                                                {
                                                    tag: 'span',
                                                    class: 'profile__form__info__item-field',
                                                    text: 'Пароль'
                                                },
                                                {
                                                    tag: 'span',
                                                    class: 'profile__form__info__item-value',
                                                    text: this.props.profile.password
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
                                                    text: 'Пароль еще раз'
                                                },
                                                {
                                                    tag: 'span',
                                                    class: 'profile__form__info__item-value',
                                                    text: this.props.profile.password2
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tag: 'div',
                                    class: 'profile__form__footer,profile__edit__form__footer',
                                    childNode_0: new Button({ className: 'btn,profile__form__footer__btn_type_save', text: 'Сохранить', attr: { onSave: 'onSave' } }),
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=profile-edit.js.map