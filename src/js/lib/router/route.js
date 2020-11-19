import { isEqual } from '../helpers.js';
export class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._block = view;
        this._props = props;
        return this;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render(this._block);
        }
    }
    leave() {
        this._block.hide();
    }
    match(pathname) {
        return isEqual(pathname, this._pathname);
    }
    render(block) {
        block.show();
    }
}
//# sourceMappingURL=route.js.map