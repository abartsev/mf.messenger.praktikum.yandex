const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};
export class HTTPTransport {
    constructor(baseurl) {
        this.options = {
            data: null,
            getParam: null,
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
            const { data, method, timeout, getParam } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                if (method === METHODS.GET && getParam) {
                    url = `${url}${this.queryStringify(getParam)}`;
                }
                method && xhr.open(method, `${this.baseurl}${url}`);
                xhr.setRequestHeader('Content-Type', 'application/json');
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
                    console.log(data);
                    xhr.send(JSON.stringify(data));
                }
            });
        };
        this.baseurl = baseurl;
    }
    queryStringify(data) {
        return Object.keys(data).reduce((a, e, i, arr) => a + `${e}=${data[e].toString()}${i + 1 < arr.length ? '&' : ''}`, '?');
    }
}
//# sourceMappingURL=fetch.js.map