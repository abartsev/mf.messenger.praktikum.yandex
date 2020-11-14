import { isEqual } from '../helpers.js';
export class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._block = view;
        this._props = props;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render(this._block, pathname);
        }
    }
    leave() {
        if (this._block) {
            this._block.hide();
        }
    }
    match(pathname) {
        return isEqual(pathname, this._pathname);
    }
    render(block, pathname) {
        console.log('route', block, pathname);
        block.show();
    }
}
//# sourceMappingURL=route.js.map