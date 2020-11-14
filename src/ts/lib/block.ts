import { EventBus, IEventBus } from './event-bus.js';
import { Templator, ITemplator } from './templater.js'
import { IContext } from '../components/types.js';

export interface IBlock {
  getContent: () => HTMLElement,
  element: HTMLElement,
  _element: HTMLElement,
  setProps: (props: {}) => void,
  show: () => void,
  hide: () => void,
  _saveHistory: (arr: any) => void
}

export class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };
  
    _element: HTMLElement;
    _meta: {tagName: string, className: string[], props: {}};
    eventBus: IEventBus;
    templator: ITemplator;
    props: IContext;
    _history: any;
    _template: string;
    _assembledTemplate: string;
    _module: boolean;
    constructor(tagName = "div", className: string[], props: IContext, template: string = '', module?: boolean) {
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
    }
  
    _registerEvents (eventBus: IEventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  
    _createResources () {

      const { tagName, className } = this._meta;
      
      if (document.querySelector(`.${className.join('.')}`)) {
        this._element = document.querySelector(`.${className.join('.')}`) as HTMLElement;
      } else {
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
      return this.componentDidMount(this.props)
    }

    _saveHistory (history: any) {
      if (this.props.Link) {
        this.props.Link = history
      }
      this._history = history;
    }
  
    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps: {}): void {
      
    }
  
    _componentDidUpdate(oldProps: {}, newProps: {}) {
      const response = this.componentDidUpdate(oldProps, newProps);
  
      if (response) {
        this._render();
      }
    }
  
    componentDidUpdate(oldProps: {[key: string]: []}, newProps: {[key: string]: []}) {
      const map: boolean[] = [];

      if (oldProps && newProps) {
        Object.keys(oldProps).forEach((e) => {
          map.push(oldProps[e] !== newProps[e]);
        });
      }

      return map.includes(true);
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
  
    _render() {
      const block: any = this.render();
      this.templator = new Templator(block);
      this._assembledTemplate = this.templator.compile(this.props);
      let mapTag: string = '';
      if (this._module) {
        mapTag = this._element.innerHTML;
      }
      this._element.innerHTML = mapTag + this._assembledTemplate;
    }

    render() { }
  
    getContent() {
      return this.element;
    }
  
    _makePropsProxy(props: IContext) {
      
      return new Proxy(props, {
        set: (target: IContext, prop: string, val: any) => {
          if (prop.startsWith("_")) {
            throw new Error("Отказано в доступе");
          } else {
            const prevProps: IContext = { ...target };
            if (prop === 'Link') {
              target[prop]._history = val;
            } else {
              target[prop] = val;
              this.eventBus.emit(Block.EVENTS.FLOW_CDU, prevProps, target);
            }
            return true;
          }
        },
        get:<T extends IContext,>(target: T, prop: string) => {
          if (prop.startsWith("_")) {
            throw new Error("Отказано в доступе");
          } else {
            return target[prop];
          }
        }
      });
    }
  
    _createDocumentElement(tagName: string): HTMLElement {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return document.createElement(tagName);
    }
  
    show() {
        const _root = document.querySelector('.app') as HTMLElement; 
        _root.appendChild(this.getContent());
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
  
    hide() {
      this._element.remove();
    }
  }
  