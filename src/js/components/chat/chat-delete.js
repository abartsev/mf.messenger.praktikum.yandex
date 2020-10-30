import { Chat } from './chat.js';
import { chatDeleteTemplate } from './templates/chat-delete.tmpl.js';
const context = {
    delete_onclick: '',
    cancel_onclick: ''
};
new Chat('div', ['layout_type_modal', 'layout_bg_gray'], context, chatDeleteTemplate);
//# sourceMappingURL=chat-delete.js.map