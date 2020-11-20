import { IBlock } from '../block';
import { IRoute, Route } from './route';
export interface IRouter {
    go: (hash: string) => void,
    use: (hash: string, block: IBlock) => {},
    start: () => void
}

export class Router implements IRouter {
    __instance: any;
    routes: any[];
    history: History;
    _currentRoute: IRoute|null|undefined;
    _rootQuery: string  
    interval: number;
    
    constructor(rootQuery: string, store: any) {
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

    use(hash: string, block: IBlock) {
        const route: IRoute = new Route(hash, block, {rootQuery: this._rootQuery});
        this._setHistory(route);
        
        return this;
    }

    start() {
        window.onpopstate = ((event: {currentTarget: {location: {hash: string}}}) => {
            this._onRoute(event.currentTarget.location.hash);}).bind(this);
        this._onRoute(window.location.hash);
    }

    _onRoute(hash: string) {
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        const route = this.getRoute(hash);

        route && route.render(route._block);
    }

    go(hash: string) {
        this._currentRoute = this.getRoute(window.location.hash);
        
        this.history.pushState({}, "page", hash);
        this._onRoute(hash);
    }
    _setHistory (route: IRoute) {
        this.routes.push(route);
    }

    _getHistory (): IRoute[] {
        return this.routes;
    }

    back() {
      window.history.back();
    }

    listen = () => {
        clearInterval(this.interval);
        this.interval = <any>setInterval(this._interval, 1000);
    }

    _interval = () => {
        this._currentRoute = this.getRoute(window.location.hash);

        if (!this._currentRoute) {
           this.go('#error'); 
        } 
    }

    forward() {
      window.history.forward();
    }

    getRoute(hash: string) {
        let routes = this._getHistory();
        hash = hash.replace(/\d+/gm, ':id');

        if (routes) {
            return routes.find(route => route.match(hash));    
        }
    }
}
