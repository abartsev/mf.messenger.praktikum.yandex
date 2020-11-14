import { IBlock } from '../block.js';
import { isEqual } from '../helpers.js';

type RouteProps = {
    rootQuery: string
}

export interface IRoute {
    _pathname: {},
    _block: IBlock,
    navigate: (pathname: string) => void,
    leave: () => void,
    match: (pathname: {}) => void,
    render: (block: IBlock, pathname: string) => void
}

export class Route implements IRoute {
    _pathname: string;
    _block: IBlock;
    _props: RouteProps;

    constructor(pathname: string, view: IBlock, props: RouteProps) {
        this._pathname = pathname;
        this._block = view;
        this._props = props;
    }

    navigate(pathname: string) {
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

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render(block: IBlock, pathname: string) {
        console.log('route', block, pathname);
        

        block.show();
    }
}