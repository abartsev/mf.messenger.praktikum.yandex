import {Router, IRouter} from '../lib/router/router';
import {IBlock} from '../lib/block';
import {Login} from '../components/form/login';
import {Signin} from '../components/form/signin';
import {Chat} from '../components/chat/chat';
import {Profile} from '../components/profile/profile';
import {ProfileEdit} from '../components/profile/profile-edit';
import {ErrorPage} from '../components/error-page/error-page';
import {Store, IStore} from '../lib/store/store';
import './app.css';

class App {
    initialStore: any;
    store: IStore;
    _router: IRouter;
    login: IBlock;
    signin: IBlock;
    chat: IBlock;
    chatId: IBlock;
    profile: IBlock;
    profileEdit: IBlock;
    errorPage: IBlock;
    constructor() {
    	this.initialStore = {
    		routers: [],
    		chat: [],
    		error: {
    			title: 404,
    			description: 'Не туда попали'
    		},
    		profile: {
    			email: 'a.barczev876@yandex.ru',
    			firstName: 'Анатолий',
    			id: '946',
    			login: 'test234',
    			password: '123456',
    			phone: '89585945528',
    			secondName: 'wede'
    		}
    	};
    	this.store = new Store(this.initialStore);

    	this._router = new Router('.app', this.initialStore.routers);

    	this.login = new Login(this.initialStore);
    	this.signin = new Signin(this.initialStore, this.changeStoreProfile);
    	this.chat = this.store.on('CHANGECHAT', new Chat(this.initialStore, this.changeStoreChat), 'chat');
    	this.chatId = this.store.on('CHANGECHAT', new Chat(this.initialStore, this.changeStoreChat), 'chat');
    	this.profile = new Profile(this.initialStore);
    	this.profileEdit = new ProfileEdit(this.initialStore);
    	this.errorPage = new ErrorPage(this.initialStore);
    }

    changeStoreChat = (path: string, data: any, action: string): void => {
    	this.initialStore = {...this.initialStore, [path]: [...this.initialStore[path], data]};
    	this.store.emit(action, this.initialStore[path]);
    }

    changeStoreProfile = (path: string, data: any): void => {
    	this.initialStore = {...this.initialStore, [path]: {...this.initialStore[path], ...data}};
    }

    render() {
    	this._router.use('#login', this.login);
    	this._router.use('#chat', this.chat);
    	this._router.use('#chat/:id/', this.chatId);
    	this._router.use('#signin', this.signin);
    	this._router.use('#profile', this.profile);
    	this._router.use('#profile-edit', this.profileEdit);
    	this._router.use('#error', this.errorPage);
    	this._router.start();
    }
}

const app = new App();
app.render();
