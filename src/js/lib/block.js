import { EventBus } from './event-bus.js';
import { Templator } from './templater.js';
import { isEqual } from './helpers.js';
export class Block {
    constructor(props) {
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        this._makePropsProxy = (props) => {
            return new Proxy(props, {
                set: (target, prop, val) => {
                    if (prop.startsWith("_")) {
                        throw new Error("Отказано в доступе");
                    }
                    else {
                        const prevProps = Object.assign({}, target);
                        target[prop] = val;
                        this.eventBus.emit(Block.EVENTS.FLOW_CDU, target, prevProps);
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
        };
        this.eventBus = new EventBus();
        this.templator = new Templator();
        this.props = this._makePropsProxy(props);
        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    _componentDidMount() {
        return this.componentDidMount(this.props);
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps) {
        console.log(oldProps);
    }
    _componentDidUpdate(newProps, oldProps) {
        if (!oldProps) {
            oldProps = this.props;
        }
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            this._render();
        }
    }
    componentDidUpdate(oldProps, newProps) {
        return isEqual(oldProps, newProps);
    }
    get element() {
        return this._element;
    }
    getContent() {
        return this.element;
    }
    _render() {
        const block = this.render();
        let flag = false;
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
    render() { }
    show() {
        const _root = document.querySelector('.app');
        if (this._element) {
            _root.appendChild(this._element);
        }
        setTimeout(() => this.eventBus.emit(Block.EVENTS.FLOW_CDM), 0);
    }
    hide() {
        const delElem = document.querySelector(`.${this._element.className}`);
        delElem.remove();
    }
}
Block.EVENTS = {
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
};
//# sourceMappingURL=block.js.map