import { Block } from '../../lib/block.js';
import { ChatAside } from './chat-aside/chat-aside.js';
import { ChatMsgs } from './chat-body/chat-main-select-msg.js';
import { ChatHeader } from './chat-body/chat-main-select-header.js';
import { ChatFooter } from './chat-body/chat-main-select-footer.js';
import { Router } from '../../lib/router/router.js';
import { ChatApi } from '../../api/chat.js';
export class Chat extends Block {
    constructor(store, changeStore) {
        super({ chat: store.chat });
        this.handleClickLink = () => {
            this.router.go('/profile');
        };
        this.handleCreateChat = () => {
            let resp = this.chatApi.createChat('', { title: 'number1' });
            console.log(resp);
            this.changeStore('chat', {}, 'CHANGECHAT');
        };
        this.router = new Router('.app', store.routers);
        this.changeStore = changeStore;
    }
    componentDidMount() {
        var _a, _b;
        this._link = document.querySelector('[data-on-click]');
        this._create_chat = document.querySelector('[data-on-create]');
        (_a = this._link) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.handleClickLink);
        (_b = this._create_chat) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.handleCreateChat);
        this.chatApi = new ChatApi();
    }
    render() {
        return {
            tag: 'div',
            class: 'chat',
            childNode_0: new ChatAside(this.props.chat),
            children: [{
                    tag: 'div',
                    class: 'chat__body',
                    condition_1: [this.props.chat.length, '>=', 1],
                    childNode_1: new ChatHeader(this.props.chat[0]),
                    childNode_2: new ChatMsgs(this.props.chat[0]),
                    childNode_3: new ChatFooter(),
                    condition_2: [this.props.chat.length, '===', 0],
                    children: [
                        {
                            tag: 'p',
                            class: 'chat__body__text-empty',
                            text: 'Выберите чат чтобы отправить сообщение'
                        }
                    ]
                }]
        };
    }
}
//# sourceMappingURL=chat.js.map