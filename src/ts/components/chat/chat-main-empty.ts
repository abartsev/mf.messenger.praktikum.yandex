import { IContext } from '../types.js';
import { Chat } from './chat.js';
import { chatMainTemplate } from './templates/chat-main.tmpl.js';

const context: IContext = {
    text: 'Выберите чат чтобы отправить сообщение'
}
  
new Chat('main', ['chat__body', 'chat__body-empty'], context, chatMainTemplate);