import {HTTPTransport, IHTTPTransport} from '../lib/fetch/fetch';
import {Data} from '../lib/fetch/types';

export interface IChatApi {
    createChat: (url: string, data: Data)=>any,
    addUsersToChat: (url: string, data: Data)=>any
    getToken: (url: string, id: string, data: Data)=>any
}

export class ChatApi {
    fetch: IHTTPTransport;
    constructor() {
    	this.fetch = new HTTPTransport('chats/');
    }

    createChat(url: string, data: Data) {
    	return this.fetch.post(url, {data: data});
    }

    addUsersToChat(url: string, data: Data) {
    	return this.fetch.put(url, {data: data});
    }

    getToken(url: string, id: string, data: Data) {
    	return this.fetch.post(`${url}/${id}`, {data: data});
    }
}
