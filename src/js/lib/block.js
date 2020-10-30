import { EventBus } from './event-bus.js';
import { Templator } from './templater.js';
export class Block {
    constructor(tagName = "div", className, props, template = '', module) {
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        this.eventBus = new EventBus();
        this._meta = {
            tagName,
            className,
            props
        };
        this._module = module || false;
        this._template = template;
        this.props = this._makePropsProxy(props);
        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        setTimeout(() => this.eventBus.emit(Block.EVENTS.FLOW_CDM), 0);
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    _createResources() {
        const { tagName, className } = this._meta;
        if (document.querySelector(`.${className.join('.')}`)) {
            this._element = document.querySelector(`.${className.join('.')}`);
        }
        else {
            this._element = this._createDocumentElement(tagName);
            if (className) {
                className.forEach(e => this._element.classList.add(e));
            }
        }
    }
    init() {
        this._createResources();
    }
    _componentDidMount() {
        return this.componentDidMount(this.props);
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps) {
    }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._render();
        }
    }
    componentDidUpdate(oldProps, newProps) {
        const map = [];
        if (oldProps && newProps) {
            Object.keys(oldProps).forEach((e) => {
                map.push(oldProps[e] !== newProps[e]);
            });
        }
        return map.includes(true);
    }
    get element() {
        return this._element;
    }
    _render() {
        const block = this.render();
        let mapTag = '';
        this.templator = new Templator(block);
        if (this._module) {
            mapTag = this._element.innerHTML;
        }
        this._element.innerHTML = mapTag + this.templator.compile(this.props);
    }
    render() { }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        return new Proxy(props, {
            set: (target, prop, val) => {
                if (prop.startsWith("_")) {
                    throw new Error("Отказано в доступе");
                }
                else {
                    const prevProps = Object.assign({}, target);
                    target[prop] = val;
                    this.eventBus.emit(Block.EVENTS.FLOW_CDU, prevProps, target);
                    return true;
                }
            },
            get: (target, prop) => {
                if (prop.startsWith("_")) {
                    throw new Error("Отказано в доступе");
                }
                else {
                    return target[prop];
                }
            }
        });
    }
    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    show() {
        this._element.classList.add('active');
    }
    hide() {
        this._element.classList.remove('active');
    }
}
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
};
//# sourceMappingURL=block.js.map