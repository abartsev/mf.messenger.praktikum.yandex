import { EventBus, IEventBus } from './event-bus.js';
import { Templator, ITemplator } from './templater.js'
import { IContext } from '../components/interface.js';

export interface IBlock {
  getContent: () => HTMLElement 
}

export class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };
  
    _element: HTMLElement;
    _meta: {tagName: string, props: {}};
    eventBus: IEventBus;
    templator: ITemplator;
    props: IContext;
  
    constructor(tagName = "div", props: IContext) {
        this.eventBus = new EventBus();

        this._meta = {
            tagName,
            props
        };
        
        this.props = this._makePropsProxy(props);
    
    
        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  
    _registerEvents (eventBus: IEventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  
    _createResources () {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  
    init() {
      this._createResources();
    }
  
    _componentDidMount() {
      
    }
  
    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps: {}): void {
      console.log(oldProps);
    }
  
    _componentDidUpdate(oldProps: {}, newProps: {}) {
      const response = this.componentDidUpdate(oldProps, newProps);
  
      if (response) {
        console.log("_componentDidUpdate", this);
        this._render();
      }
    }
  
    componentDidUpdate(oldProps: {[key: string]: []}, newProps: {[key: string]: []}) {
      const map: boolean[] = [];
      console.log(oldProps, newProps);
      if (oldProps && newProps) {
        Object.keys(oldProps).forEach((e) => {
          if (oldProps[e] !== newProps[e]) {
            map.push(true);
          } else {
            map.push(false);
          }
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
      const block: string = this.render();
      // Этот небезопасный метод для упрощения логики
      // Используйте шаблонизатор из npm или напишите свой безопасный
      // Нужно не в строку компилировать (или делать это правильно),
      // либо сразу в DOM-элементы возвращать из compile DOM-ноду
      
      this.templator = new Templator(block);
      
      this._element.innerHTML = this.templator.compile(this.props);
    }
  
    // Может переопределять пользователь, необязательно трогать
    render(): string { return ''}
  
    getContent() {
      return this.element;
    }
  
    _makePropsProxy(props: IContext) {
  
      const self = this;
      const prevProps: IContext = { ...props };
      console.log('_makePropsProxy', props);
      
      return new Proxy(props, {
        set(target: IContext, prop: string, val: string) {
          console.log("_makePropsProxy", target, prop, val);
          if (prop.startsWith("_")) {
            throw new Error("Отказано в доступе");
          } else {
            target[prop] = val;
  
            self.eventBus.emit(Block.EVENTS.FLOW_CDU, prevProps, target);
            return true;
          }
        },
        get<T extends IContext,>(target: T, prop: string) {
          console.log("_makePropsProxy get", target, prop);
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
  
    show() {}
  
    hide() {}
  }
  