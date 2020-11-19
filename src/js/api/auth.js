import { HTTPTransport } from '../lib/fetch/fetch.js';
export class Auth {
    constructor() {
        this.fetch = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth/');
    }
    post(url, data) {
        return this.fetch.post(url, { data: data });
    }
}
//# sourceMappingURL=auth.js.map