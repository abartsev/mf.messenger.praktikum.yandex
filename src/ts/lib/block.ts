import {EventBus, IEventBus} from './event-bus';
import {Templator, ITemplator} from './templater';
import {Context} from '../components/types';
import {isEqual} from './helpers';

export interface IBlock {
  getContent: () => HTMLElement,
  props: Context,
  element: HTMLElement,
  _element: HTMLElement,
  setProps: (props: {}) => void,
  show: () => void,
  hide: () => void,
  _componentDidUpdate: (newProps: {[key: string]: []}, oldProps?: {[key: string]: []})=>void
}

export class Block {
    static EVENTS = {
    	FLOW_CDM: 'flow:component-did-mount',
    	FLOW_CDU: 'flow:component-did-update',
    	FLOW_RENDER: 'flow:render'
    };

    _element: HTMLElement;
    _meta: {tagName: string, className: string[]};
    eventBus: IEventBus;
    templator: ITemplator;
    props: Context;

    constructor(props: Context) {
    	this.eventBus = new EventBus();
    	this.templator = new Templator();
    	this.props = this._makePropsProxy(props);
    	this._registerEvents(this.eventBus);
    	this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    _registerEvents(eventBus: IEventBus) {
    	eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    	eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    	eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _componentDidMount() {
    	return this.componentDidMount(this.props);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps: {}): void {
    	console.log(oldProps);
    }

    _componentDidUpdate(newProps: {}, oldProps?: {}) {
    	if (!oldProps) {
    		oldProps = this.props;
    	}

    	const response = this.componentDidUpdate(oldProps, newProps);

    	if (!response) {
    		this._render();
    	}
    }

    componentDidUpdate(oldProps: {[key: string]: []}, newProps: {[key: string]: []}) {
    	return isEqual(oldProps, newProps);
    }

    setProps = (nextProps: {}) => {
    	if (!nextProps) {
    		return;
    	}

    	Object.assign(this.props, nextProps);
    };

    get element() {
    	return this._element;
    }

    getContent() {
    	return this.element;
    }

    _makePropsProxy = (props: Context) => {
    	return new Proxy(props, {
    		set: (target: Context, prop: string, val: any) => {
    			if (prop.startsWith('_')) {
    				throw new Error('Отказано в доступе');
    			} else {
    				const prevProps: Context = {...target};
    				target[prop] = val;
    				this.eventBus.emit(Block.EVENTS.FLOW_CDU, target, prevProps);
    				return true;
    			}
    		},
    		get: <T extends Context, >(target: T, prop: string) => {
    			if (prop.startsWith('_')) {
    				throw new Error('Отказано в доступе');
    			} else {
    				return target[prop];
    			}
    		}
    	});
    }

    _render() {
    	const block: any = this.render();
    	let flag: boolean = false;
    	if (this._element) {
    		flag = true;
    		this._element.remove();
    	}

    	this._element = this.templator.compile(block, this.props);
    	if (flag) {
    		this.show();
    		flag = false;
    	}
    }

    render() {}

    show() {
    	const _root = document.querySelector('.app') as HTMLElement;
    	if (this._element) {
    		_root.appendChild(this._element);
    	}

    	setTimeout(() => this.eventBus.emit(Block.EVENTS.FLOW_CDM), 0);
    }

    hide() {
    	const delElem = document.querySelector(`.${this._element.className}`) as HTMLElement;
    	delElem.remove();
    }
}
