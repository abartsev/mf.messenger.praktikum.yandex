import { HTTPTransport, IHTTPTransport } from '../lib/fetch/fetch';

export interface IChatApi {
    createChat: (url: string, data: {[index: string]: string | {[index: string]: string} | []})=>any,
    addUsersToChat: (url: string, data: {[index: string]: string | {[index: string]: string} | []})=>any
}

export class ChatApi {

    fetch: IHTTPTransport;
    constructor () {
        this.fetch = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats/');
    }

    createChat(url: string, data: {[index: string]: string}) {
        return this.fetch.post(url, {data: data});
    }
    addUsersToChat(url: string, data: {[index: string]: string | []}) {
        return this.fetch.put(url, {data: data});
    }
}