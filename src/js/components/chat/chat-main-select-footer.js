import { Chat } from './chat.js';
import { chatMainSelectFooterTemplate } from './templates/chat-main-select-footer.tmpl.js';
const context = {
    field_msg: '',
    btn_onclick: ''
};
new Chat('main', ['chat__body', 'chat__body-active'], context, chatMainSelectFooterTemplate, true);
//# sourceMappingURL=chat-main-select-footer.js.map