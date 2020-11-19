import { Block } from './../../../lib/block.js';
export class ChatFooter extends Block {
    constructor() {
        super({ input_msg: '' });
    }
    render() {
        return {
            tag: 'div',
            class: 'chat__footer',
            children: [
                {
                    tag: 'div',
                    class: 'footer__attach',
                    children: [
                        {
                            tag: 'div',
                            class: 'attach__menu',
                            children: [
                                {
                                    tag: 'ul',
                                    class: 'menu__modal,attach__menu__active',
                                    children: [
                                        {
                                            tag: 'li',
                                            class: 'menu__item',
                                            children: [
                                                {
                                                    tag: 'span',
                                                    class: 'menu__icon,menu__icon-image'
                                                },
                                                {
                                                    tag: 'span',
                                                    text: 'Фото или Видео',
                                                }
                                            ]
                                        },
                                        {
                                            tag: 'li',
                                            class: 'menu__item',
                                            children: [
                                                {
                                                    tag: 'span',
                                                    class: 'menu__icon,menu__icon-newfile'
                                                },
                                                {
                                                    tag: 'span',
                                                    text: 'Файл',
                                                }
                                            ]
                                        },
                                        {
                                            tag: 'li',
                                            class: 'menu__item',
                                            children: [
                                                {
                                                    tag: 'span',
                                                    class: 'menu__icon,menu__icon-dot'
                                                },
                                                {
                                                    tag: 'span',
                                                    text: 'Локация',
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'input',
                    class: 'footer__input',
                    options: {
                        type: 'text',
                        name: 'input_msg',
                        placeholder: 'Сообщение'
                    },
                    value: 'input_msg'
                },
                {
                    tag: 'button',
                    class: 'circle__btn,circle__btn_type_right'
                }
            ]
        };
    }
}
//# sourceMappingURL=chat-main-select-footer.js.map