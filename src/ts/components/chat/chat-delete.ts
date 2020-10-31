import { Button } from './../common/button/button.js';
import { IContext } from '../interface.js';
import { Chat } from './chat.js';
import { chatDeleteTemplate } from './templates/chat-delete.tmpl.js';

const context: IContext = {
    delete_onclick: '',
    cancel_onclick: '',
    ButtonDelete: new Button(['btn', 'btn_type_delete', 'modal__footer__btn', 'delete_onclick'], {text: 'Удалит'}),
    ButtonCancel: new Button(['btn', 'btn_type_cancel', 'modal__footer__btn', 'cancel_onclick'], {text: 'Отменить'})
}
  
new Chat('div', ['layout_type_modal', 'layout_bg_gray'], context, chatDeleteTemplate);