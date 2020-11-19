import { IBlock } from '../block.js';
import { IRoute, Route } from './route.js'

export interface IRouter {
    go: (pathname: string, routs: IRoute[]) => void
}

export class Router implements IRouter {
    __instance: any;
    routes: IRoute[];
    history: History;
    _currentRoute: IRoute|null|undefined;
    _rootQuery: string  

    
    constructor(rootQuery: string) {
        if (this.__instance) {
            return this.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this.routes = store;
    }

    use(pathname: string, block: IBlock) {
        const route: IRoute = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        console.log(route._block);
        
        route._block._saveHistory(this.routes);
        
        return this;
    }

    start() {
      window.onpopstate = ((event: {currentTarget: {location: {pathname: string}}}) => {
      this._onRoute(event.currentTarget.location.pathname);}).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        console.log(this._currentRoute, window.location.pathname);
        const route = this.getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        route && route.render(route._block, pathname);
    }

    go(pathname: string, routs: IRoute[]) {
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

    getRoute(pathname: string) {

        return this.routes.find(route => route.match(pathname));
    }
}
