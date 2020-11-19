export class Store {
    constructor(store) {
        this.listeners = {};
        this.store = store;
    }
    on(event, block, path) {
        if (!this.listeners[event]) {
            this.listeners[event] = {
                block,
                path
            };
        }
        return block;
    }
    emit(event, props) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        let path = this.listeners[event].path;
        this.listeners[event].block.props[path] = props;
    }
}
//# sourceMappingURL=store.js.map