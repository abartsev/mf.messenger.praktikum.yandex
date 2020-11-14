const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};
function queryStringify(data) {
    return Object.keys(data).reduce((a, e, i, arr) => a + `${e}=${data[e].toString()}${i + 1 < arr.length ? '&' : ''}`, '?');
}
export class HTTPTransport {
    constructor() {
        this.options = {
            data: null,
            timeout: null,
            method: '',
            headers: {}
        };
        this.get = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }));
        };
        this.post = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.POST }));
        };
        this.put = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }));
        };
        this.delete = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.DELETE }));
        };
        this.request = (url, options) => {
            const { data, method, timeout } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                // if (method === METHODS.GET && data) {
                //     url = `${url}${queryStringify(data)}`;
                //  }
                xhr.open(method, url);
                xhr.onload = function () {
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
                }
                else {
                    xhr.send(data);
                }
            });
        };
    }
}
//# sourceMappingURL=fetch.js.map