import { Button } from './../common/button/button';
import { Block } from './../../lib/block';

export class ChatDelete extends Block {
    constructor () {
        super({});
    }

    render() {
        return {
            tag: 'div',
            class: 'modal,modal__delete',
            children: [
                {
                    tag: 'h3',
                    class: 'modal__title',
                    text: 'Вы хотите удалить чат'
                },
                {
                    tag: 'div',
                    class: 'modal__footer',
                    childNode_0: new Button({className: 'btn,btn_type_delete,modal__footer__btn', text: 'Удалит', attr: {onDelete: 'onDelete'}}),
                    childNode_1: new Button({className: 'btn,btn_type_cancel,modal__footer__btn', text: 'Отменить', attr: {onCancel: 'onCancel'}})
                }
            ]
        }
    }
}