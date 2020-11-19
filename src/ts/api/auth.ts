import { HTTPTransport, IHTTPTransport } from '../lib/fetch/fetch';

export interface IAuth {
    post: (url: string, data: {[index: string]: string | {[index: string]: string}})=>any
}

export class Auth {

    fetch: IHTTPTransport;
    constructor () {
        this.fetch = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth/');
    }

    post(url: string, data: {[index: string]: string}) {
        return this.fetch.post(url, {data: data});
    }
}