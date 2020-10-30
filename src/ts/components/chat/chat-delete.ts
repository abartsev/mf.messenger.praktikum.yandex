import { IContext } from '../interface.js';
import { Chat } from './chat.js';
import { chatDeleteTemplate } from './templates/chat-delete.tmpl.js';

const context: IContext = {
    delete_onclick: '',
    cancel_onclick: ''
}
  
new Chat('div', ['layout_type_modal', 'layout_bg_gray'], context, chatDeleteTemplate);