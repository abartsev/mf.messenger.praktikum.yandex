import {Notification} from './../helper/notification';
import {Block} from '../../lib/block';
import {ChatAside} from './chat-aside/chat-aside';
import {ChatMsgs} from './chat-body/chat-main-select-msg';
import {ChatHeader} from './chat-body/chat-main-select-header';
import {ChatFooter} from './chat-body/chat-main-select-footer';
import {Router, IRouter} from '../../lib/router/router';
import {ChatApi, IChatApi} from '../../api/chat';
import './chat.css';

export class Chat extends Block {
    _link: HTMLElement | null;
    _createChat: HTMLElement | null;
    router: IRouter;
    chatApi: IChatApi;
    changeStore: (path: string, data: any, action: string) => void;

    constructor(store: any, changeStore: (path: string, data: any, action: string) => void) {
    	super({chat: store.chat, text: ''});
    	this.router = new Router('.app', store.routers);
    	this.changeStore = changeStore;
    }

    componentDidMount() {
    	this._link = document.querySelector('[data-on-click]');
    	this._createChat = document.querySelector('[data-on-create]');
    	this._link?.addEventListener('click', this.handleClickLink);
    	this._createChat?.addEventListener('click', this.handleCreateChat);
    	this.chatApi = new ChatApi();
    }

    handleClickLink = () => {
    	this.router.go('/profile');
    }

    handleCreateChat = () => {
    	this.chatApi
    		.createChat('', {title: 'number1'})
    		.then((response: any) => {
    			if (response.status >= 300) {
    				this.props.text = JSON.parse(response.response).reason;
    			} else {
    				const {id} = JSON.parse(response.response).id;
    				this.chatApi
    					.addUsersToChat('users', {users: [60], chatId: id!})
    					.then((res: any) => {
    						if (res.status >= 300) {
    							this.props.text = JSON.parse(res.response).reason;
    						} else {
    							this.changeStore('chat', {id, title: 'number1'}, 'CHANGECHAT');
    						}
    					});
    			}
    		})
    		.catch((er: string) => {
    			this.props.text = er;
    		});
    }

    render() {
    	return {
    		tag: 'div',
    		class: 'chat',
    		childNode0: new ChatAside(this.props.chat),
    		children: [{
    			tag: 'div',
    			class: 'chat__body',
    			condition1: [this.props.chat.length, '>=', 1],
    			childNode1: new ChatHeader(this.props.chat[0]),
    			childNode2: new ChatMsgs(this.props.chat[0]),
    			childNode3: new ChatFooter(),
    			condition2: [this.props.chat.length, '===', 0],
    			children: [
    				{
    					tag: 'p',
    					class: 'chat__body__text-empty',
    					text: 'Выберите чат чтобы отправить сообщение'
    				}
    			]
    		}],
    		condition1: [this.props.text.length, '>', 0],
    		childNode: new Notification(this.props.text)

    	};
    }
}
