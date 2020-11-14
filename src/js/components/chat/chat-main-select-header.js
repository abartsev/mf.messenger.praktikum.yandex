import { Chat } from './chat.js';
import { chatMainSelectHeaderTemplate } from './templates/chat-main-select-heder.tmpl.js';
const context = {
    name: 'Андрей',
    on_line: 'был 5 минут назад'
};
new Chat('main', ['chat__body', 'chat__body-active'], context, chatMainSelectHeaderTemplate, true);
//# sourceMappingURL=chat-main-select-header.js.map