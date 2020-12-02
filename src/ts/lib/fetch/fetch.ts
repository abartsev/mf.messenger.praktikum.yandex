import {Options} from './types';

enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
};

export interface IHTTPTransport {
    get: (url: string, options: Options) => Promise<any>,
    post: (url: string, options: Options) => Promise<any>,
    put: (url: string, options: Options) => Promise<any>,
    delete: (url: string, options: Options) => Promise<any>
}

export class HTTPTransport {
    options: Options = {
        data: null,
        getParam: null,
        timeout: null,
        method: '',
        headers: {}
    }
    private _baseUrl: string = 'https://ya-praktikum.tech/api/v2/';
    url: string;
    constructor (baseurl: string) {
        this.url = baseurl;
    }

    get = (url: string, options = {}) => {       
        return this.request(url, {...options, method: METHODS.GET} as Options);
    };

    post = (url: string, options = {}) => {     
        return this.request(url, {...options, method: METHODS.POST} as Options);
    };

    put = (url: string, options = {}) => {       
        return this.request(url, {...options, method: METHODS.PUT} as Options);
    };

    delete = (url: string, options = {}) => {      
        return this.request(url, {...options, method: METHODS.DELETE} as Options);
    };

    get getBaseurl () {
        return `${this._baseUrl}${this.url}`;
    }

    request = (url: string, options: Options): Promise<any> => {
        const {data, method, timeout, getParam} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            if (method === METHODS.GET && getParam) {
                url = `${url}${this.queryStringify(getParam)}`;
            }

            method && xhr.open(method, `${this.getBaseurl}${url}`);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.withCredentials = true;

            xhr.onload = function() {
                resolve(xhr);
            };
                    
            if (timeout) {
                setTimeout(() => xhr.abort(), timeout);
            }
                
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }

    queryStringify(data: {[index: string]: string}) {
        return Object.keys(data).reduce((a,e,i,arr)=> a + `${e}=${data[e].toString()}${i+1 < arr.length ? '&' : ''}`, '?');
    }

}
