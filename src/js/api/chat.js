import { HTTPTransport } from '../lib/fetch/fetch.js';
export class ChatApi {
    constructor() {
        this.fetch = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats/');
    }
    createChat(url, data) {
        return this.fetch.post(url, { data: data });
    }
    addUsersToChat(url, data) {
        return this.fetch.put(url, { data: data });
    }
}
//# sourceMappingURL=chat.js.map