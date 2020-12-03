import {HTTPTransport, IHTTPTransport} from '../lib/fetch/fetch';
import {Data} from '../lib/fetch/types';

export interface IAuth {
    signIn: (url: string, data: Data)=>any,
    signUp: (url: string, data: Data)=>any,
    logout: ()=>any
}

export class Auth {
    fetch: IHTTPTransport;
    constructor() {
    	this.fetch = new HTTPTransport('auth/');
    }

    signIn(url: string, data: Data) {
    	return this.fetch.post(url, {data: data});
    }

    signUp(url: string, data: Data) {
    	return this.fetch.post(url, {data: data});
    }

    logout() {
    	return this.fetch.post('logout');
    }
}
