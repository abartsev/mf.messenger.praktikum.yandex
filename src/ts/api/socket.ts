export interface ISocketIo {
    send: (content: string)=>void,
}
// 205 testBA2
export class SocketIo implements ISocketIo {
    _socket: any;
    constructor(userId: string, chatId: string, token: string) {
    	this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    	this._socket.addEventListener('open', () => {
    		console.log('Соединение установлено');
    	});

    	this._socket.addEventListener('close', (event: any) => {
    		if (event.wasClean) {
    			console.log('Соединение закрыто чисто');
    		} else {
    			console.log('Обрыв соединения');
    		}

    		console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    	});

    	this._socket.addEventListener('message', (event: any) => {
    		console.log('Получены данные', event.data);
    	});
    }

    send(content: string) {
    	this._socket.send(JSON.stringify({
    		content,
    		type: 'message'
    	}));
    }

    error() {
    	this._socket.addEventListener('error', (event: any) => {
    		console.log('Ошибка', event.message);
    	});
    }
}

