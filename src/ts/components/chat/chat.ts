import { Block } from '../../lib/block';
import { ChatAside } from './chat-aside/chat-aside';
import { ChatMsgs } from './chat-body/chat-main-select-msg';
import { ChatHeader } from './chat-body/chat-main-select-header';
import { ChatFooter } from './chat-body/chat-main-select-footer';
import { Router, IRouter } from '../../lib/router/router';
import { ChatApi, IChatApi } from '../../api/chat';

export class Chat extends Block {

    _link: HTMLElement | null;
    _create_chat: HTMLElement | null;
    router: IRouter;
    chatApi: IChatApi;
    changeStore: (path: string, data: any, action: string) => void;

    constructor(store: any, changeStore: (path: string, data: any, action: string) => void) {
        super({chat: store.chat});
        this.router = new Router('.app', store.routers);
        this.changeStore = changeStore;
    }
    componentDidMount() {
        this._link = document.querySelector('[data-on-click]');
        this._create_chat = document.querySelector('[data-on-create]');
        this._link?.addEventListener('click', this.handleClickLink);
        this._create_chat?.addEventListener('click', this.handleCreateChat);
        this.chatApi = new ChatApi();
        
    }

    handleClickLink = () => {
        this.router.go('/profile');
    }

    handleCreateChat = () => {
        let resp = this.chatApi.createChat('', {title: 'number1'});

        console.log(resp);
        this.changeStore('chat', {}, 'CHANGECHAT');
    }

    render() {
        return {
            tag: 'div',
            class: 'chat',
            childNode_0: new ChatAside(this.props.chat),
            children: [{
                tag: 'div',
                class: 'chat__body',
                condition_1: [this.props.chat.length,'>=',1],
                childNode_1: new ChatHeader(this.props.chat[0]),
                childNode_2: new ChatMsgs(this.props.chat[0]),
                childNode_3: new ChatFooter(),
                condition_2: [this.props.chat.length,'===', 0],
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