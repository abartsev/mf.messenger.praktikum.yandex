import { Route } from './route.js';
export class Router {
    constructor(rootQuery, store) {
        this.listen = () => {
            clearInterval(this.interval);
            this.interval = setInterval(this._interval, 1000);
        };
        this._interval = () => {
            this._currentRoute = this.getRoute(window.location.hash);
            if (!this._currentRoute) {
                this.go('#error');
            }
        };
        if (this.__instance) {
            return this.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this.__instance = this;
        this.routes = store;
        this.listen();
    }
    use(hash, block) {
        const route = new Route(hash, block, { rootQuery: this._rootQuery });
        this._setHistory(route);
        return this;
    }
    start() {
        window.onpopstate = ((event) => {
            this._onRoute(event.currentTarget.location.hash);
        }).bind(this);
        this._onRoute(window.location.hash);
    }
    _onRoute(hash) {
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        const route = this.getRoute(hash);
        route && route.render(route._block);
    }
    go(hash) {
        this._currentRoute = this.getRoute(window.location.hash);
        this.history.pushState({}, "page", hash);
        this._onRoute(hash);
    }
    _setHistory(route) {
        this.routes.push(route);
    }
    _getHistory() {
        return this.routes;
    }
    back() {
        window.history.back();
    }
    forward() {
        window.history.forward();
    }
    getRoute(hash) {
        let routes = this._getHistory();
        hash = hash.replace(/\d+/gm, ':id');
        if (routes) {
            return routes.find(route => route.match(hash));
        }
    }
}
//# sourceMappingURL=router.js.map