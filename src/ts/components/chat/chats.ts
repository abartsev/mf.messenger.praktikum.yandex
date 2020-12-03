/* eslint-disable no-multi-assign */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import {Notification} from '../helper/notification';
import {Block} from '../../lib/block';
import {ChatAside} from './chat-aside/chat-aside';
import {ChatMsgs} from './chat-body/chat-main-select-msg';
import {ChatHeader} from './chat-body/chat-main-select-header';
import {ChatFooter} from './chat-body/chat-main-select-footer';
import {Router, IRouter} from '../../lib/router/router';
import {ChatApi, IChatApi} from '../../api/chat';
import {SocketIo, ISocketIo} from '../../api/socket';
import './chat.css';

export class Chats extends Block {
    _link: HTMLElement | null;
	_createChat: HTMLElement | null;
	chatClick: NodeList | null;
	sendBtn: HTMLElement | null;
	inputMsg: HTMLElement | null;
	_insSocket: ISocketIo;
    router: IRouter;
    chatApi: IChatApi;
    changeStore: (path: string, data: any, action: string) => void;

    constructor(store: any, changeStore: (path: string, data: any, action: string) => void) {
    	super({chat: store.chat, text: '', input_msg: ''});
    	this.router = new Router('.app', store.routers);
    	this.changeStore = changeStore;
    }

    componentDidMount() {
    	if (this.props.chat.length && !this._insSocket) {
    		this._insSocket = new SocketIo('60', this.props.chat[0].id, this.props.chat[0].token);
    	}

    	this._link = document.querySelector('[data-on-click]');
    	this.chatClick = document.querySelectorAll('[data-on-click-chat]');
    	this._createChat = document.querySelector('[data-on-create]');
    	this.sendBtn = document.querySelector('[data-on-send-msg]');
    	this.inputMsg = document.querySelector('[data-on-change-msg]');
    	this._link?.addEventListener('click', this.handleClickLink);
    	this._createChat?.addEventListener('click', this.handleCreateChat);
    	this.sendBtn?.addEventListener('click', this.handleClickMsg);
    	this.inputMsg?.addEventListener('input', this.handleChangeMsg);
    	this.chatApi = new ChatApi();
    	Array.from(this.chatClick).forEach((elem: HTMLElement | any) => {
    		elem?.addEventListener('click', this.handleClickChat);
    	});
    }

    handleClickLink = () => {
    	this.router.go('#profile');
    }

	handleClickChat = (elem: HTMLElement | any) => {
		if (elem.target.dataset.idChat) {
    		this.router.go(`#chat/${elem.target.dataset.idChat}/`);
    	}
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
    							this.changeStore('chat', {id, title: `Chat ${id}`}, 'CHANGECHAT');
    						}
    					});
    			}
    		})
    		.catch((er: string) => {
    			this.props.text = er;
    		});
    }

	handleClickMsg = () => {
		this._insSocket.send(this.props.input_msg);
	}

    handleChangeMsg = (e: HTMLElement | any) => {
    	setTimeout(() => {
    		const element = document.querySelector(`[name="${e.target.name}"]`) as HTMLInputElement;
    		if (element) {
    			element.focus();
    			element.selectionStart = element.selectionEnd = element.value.length;
    		}
    	}, 0);
    	console.log(e.target);

    	this.props[e.target.name] = e.target.value;
    }

    render() {
    	return {
    		tag: 'div',
    		class: 'chat',
    		childNode0: new ChatAside(this.props.chat),
    		children: [{
    			tag: 'div',
    			class: 'chat__body',
    			childNode1: new ChatHeader(this.props.chat[0]),
    			childNode2: new ChatMsgs(this.props.chat[0]),
    			childNode3: new ChatFooter({input_msg: this.props.input_msg})
    		}],
    		condition1: [this.props.text.length, '>', 0],
    		childNode: new Notification(this.props.text)

    	};
    }
}
