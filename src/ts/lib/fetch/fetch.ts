import {Data, Options} from './types.js';

const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};



function queryStringify(data: Data) {
    return Object.keys(data).reduce((a,e,i,arr)=> a + `${e}=${data[e].toString()}${i+1 < arr.length ? '&' : ''}`, '?');
}


export class HTTPTransport {
    options: Options = {
        data: null,
        timeout: null,
        method: '',
        headers: {}
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

request = (url: string, options: Options) => {
    const {data, method, timeout} = options;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // if (method === METHODS.GET && data) {
        //     url = `${url}${queryStringify(data)}`;
        //  }
        xhr.open(method, url);

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
            xhr.send(data);
        }
    });
};
}
