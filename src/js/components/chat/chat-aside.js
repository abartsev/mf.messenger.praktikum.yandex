import { Chat } from './chat.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import { chatAsideTemplate } from './templates/chat-aside.tmpl.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
const context = {
    for_each: [{
            name: 'Андрей',
            last_msg: 'Bye',
            last_time: '23:00',
            number_new_msg: ''
        },
        {
            name: 'Иван',
            last_msg: 'Круто!',
            last_time: '10:00',
            number_new_msg: '2'
        }]
};
new Chat('aside', ['chat__sidebar'], context, chatAsideTemplate);
//# sourceMappingURL=chat-aside.js.map