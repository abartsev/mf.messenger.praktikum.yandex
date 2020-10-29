import { IContext } from '../interface.js';
import { Chat } from './chat.js';
import { chatMainSelectFooterTemplate } from './templates/chat-main-select-footer.tmpl.js';

const context: IContext = {
    field_msg: '',
    btn_onclick: ''
}
  
new Chat('main', ['chat__body', 'chat__body-active'], context, chatMainSelectFooterTemplate);