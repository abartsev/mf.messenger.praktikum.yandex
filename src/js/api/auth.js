import { HTTPTransport } from '../lib/fetch/fetch.js';
export class Auth {
    constructor() {
        this.fetch = new HTTPTransport('auth/');
    }
    post(url, data) {
        return this.fetch.post(url, { data: data });
    }
}
//# sourceMappingURL=auth.js.map