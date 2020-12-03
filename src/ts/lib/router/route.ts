/* eslint-disable no-constructor-return */
import {IBlock} from '../block';
import {isEqual} from '../helpers';

type RouteProps = {
    rootQuery: string
}

export interface IRoute {
    _pathname: {},
    _block: IBlock,
    navigate: (pathname: string) => void,
    leave: () => void,
    match: (pathname: {}) => void,
    render: (block: IBlock) => void
}

export class Route implements IRoute {
    _pathname: string;
    _block: IBlock;
    _props: RouteProps;
    __instance: IRoute;

    constructor(pathname: string, view: IBlock, props: RouteProps) {
    	this._pathname = pathname;
    	this._block = view;
    	this._props = props;
    	return this;
    }

    navigate(pathname: string) {
    	if (this.match(pathname)) {
    		this._pathname = pathname;
    		this.render(this._block);
    	}
    }

    leave() {
    	this._block.hide();
    }

    match(pathname: string) {
    	return isEqual(pathname, this._pathname);
    }

    render(block: IBlock) {
    	block.show();
    }
}
