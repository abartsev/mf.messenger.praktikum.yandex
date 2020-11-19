import { Router, IRouter } from '../lib/router/router';
import { IBlock } from '../lib/block';
import { Login } from '../components/form/login';
import { Signin } from '../components/form/signin';
import { Chat } from '../components/chat/chat';
import { Profile } from '../components/profile/profile';
import { ProfileEdit } from '../components/profile/profile-edit';
import { ErrorPage } from '../components/error-page/error-page';
import { Store, IStore } from '../lib/store/store';

class App {
    initialStore: any;
    store: IStore;
    _router: IRouter;
    login: IBlock;
    signin: IBlock;
    chat: IBlock;
    chatId: IBlock;
    profile: IBlock;
    profile_edit: IBlock;
    error_page: IBlock;
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
                first_name: 'Анатолий',
                id: '946',
                login: 'test234',
                password: '123456',
                phone: '89585945528',
                second_name: 'wede'
            }
        };
        this.store = new Store(this.initialStore);

        this._router = new Router('.app', this.initialStore.routers);

        this.login = new Login(this.initialStore);
        this.signin = new Signin(this.initialStore, this.changeStoreProfile);
        this.chat = this.store.on('CHANGECHAT', new Chat(this.initialStore, this.changeStoreChat), 'chat');
        this.chatId = this.store.on('CHANGECHAT', new Chat(this.initialStore, this.changeStoreChat), 'chat');
        this.profile = new Profile(this.initialStore);
        this.profile_edit = new ProfileEdit(this.initialStore);
        this.error_page = new ErrorPage(this.initialStore);
    }

    changeStoreChat = (path: string, data: any, action: string): void => {
        this.initialStore = {...this.initialStore, [path]: [...this.initialStore[path], data]};
        this.store.emit(action, this.initialStore[path])
    }

    changeStoreProfile = (path: string, data: any): void => {
        console.log(data, this.initialStore);
        
        this.initialStore = {...this.initialStore, [path]: {...this.initialStore[path], ...data}}
    }

    render () {
        this._router.use('/', this.login);
        this._router.use('/chat', this.chat);
        this._router.use('/chat/:id/', this.chatId);
        this._router.use('/signin', this.signin);
        
        this._router.use('/profile', this.profile);
        this._router.use('/profile-edit', this.profile_edit);
        this._router.use('/error', this.error_page);
        this._router.start();
    }
}

const app = new App();
app.render();


// {
                //     name: 'Андрей',
                //     last_msg: 'Bye',
                //     last_time: '23:00',
                //     number_new_msg: '',
                //     on_line: '10 мин назад',
                //     msg: [
                //         {
                //             className: 'user',
                //             msg: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
                //             msg_time: '10:15'
                //         },{
                //             className: 'own',
                //             msg: 'Круто!',
                //             msg_time: '10:15'
                //         } 
                //     ]
                // },
                // {
                //     name: 'Иван',
                //     last_msg: 'Круто!',
                //     last_time: '10:00',
                //     on_line: '5 мин назад',
                //     number_new_msg: '1',
                //     msg: [
                //         {
                //             className: 'user',
                //             msg: 'Привет!',
                //             msg_time: '12:15'
                //         },{
                //             className: 'own',
                //             msg: 'Hi',
                //             msg_time: '12:15'
                //         },
                //         {
                //             className: 'user',
                //             msg: 'Как дела?',
                //             msg_time: '12:20'
                //         }
                //     ]
                // }