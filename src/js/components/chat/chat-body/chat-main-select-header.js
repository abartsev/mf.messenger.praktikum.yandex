import { Block } from './../../../lib/block.js';
export class ChatHeader extends Block {
    constructor(store) {
        super(Object.assign({}, store));
    }
    render() {
        return {
            tag: 'div',
            class: 'chat__header,chat__card-user',
            children: [
                {
                    tag: 'div',
                    class: 'card__info',
                    children: [
                        {
                            tag: 'div',
                            class: 'card__info__left',
                            children: [
                                {
                                    tag: 'div',
                                    class: 'card__info__logo'
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            class: 'card__info__right',
                            children: [
                                {
                                    tag: 'span',
                                    class: 'card__info__name',
                                    text: this.props.name
                                },
                                {
                                    tag: 'span',
                                    class: 'card__info__last-msg',
                                    text: this.props.on_line
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    class: 'card__info',
                    children: [
                        {
                            tag: 'div',
                            class: 'left__menu',
                            children: [
                                {
                                    tag: 'ul',
                                    class: 'menu__modal,left__menu__active',
                                    children: [
                                        {
                                            tag: 'li',
                                            class: 'menu__item',
                                            children: [
                                                {
                                                    tag: 'span',
                                                    class: 'menu__icon,menu__icon-writing'
                                                },
                                                {
                                                    tag: 'span',
                                                    text: 'Переименовать',
                                                }
                                            ],
                                        },
                                        {
                                            tag: 'li',
                                            class: 'menu__item',
                                            children: [
                                                {
                                                    tag: 'span',
                                                    class: 'menu__icon,menu__icon-delete',
                                                },
                                                {
                                                    tag: 'span',
                                                    text: 'Удалить',
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=chat-main-select-header.js.map