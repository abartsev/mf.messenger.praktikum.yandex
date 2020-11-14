import { Route } from './route.js';
export class Router {
    constructor(rootQuery) {
        if (this.__instance) {
            return this.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this.__instance = this;
    }
    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        console.log(route._block);
        route._block._saveHistory(this.routes);
        return this;
    }
    start() {
        window.onpopstate = ((event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
        console.log(this._currentRoute, window.location.pathname);
        const route = this.getRoute(pathname);
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        route && route.render(route._block, pathname);
    }
    go(pathname, routs) {
        if (!this.routes.length) {
            this.routes = routs;
        }
        this._currentRoute = this.getRoute(window.location.pathname);
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }
    back() {
        window.history.back();
    }
    forward() {
        window.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
//# sourceMappingURL=router.js.map