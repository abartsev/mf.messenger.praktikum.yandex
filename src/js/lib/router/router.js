import { Route } from './route.js';
export class Router {
    constructor(rootQuery, store) {
        this.listen = () => {
            clearInterval(this.interval);
            this.interval = setInterval(this._interval, 100);
        };
        this._interval = () => {
            this._currentRoute = this.getRoute(window.location.pathname);
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
    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this._setHistory(route);
        return this;
    }
    start() {
        window.onpopstate = ((event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        const route = this.getRoute(pathname);
        route && route.render(route._block);
    }
    go(pathname) {
        this._currentRoute = this.getRoute(window.location.pathname);
        this.history.pushState({}, "page", pathname);
        this._onRoute(pathname);
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
    getRoute(pathname) {
        let routes = this._getHistory();
        pathname = pathname.replace(/\d+/gm, ':id');
        console.log(pathname);
        if (routes) {
            return routes.find(route => route.match(pathname));
        }
    }
}
//# sourceMappingURL=router.js.map