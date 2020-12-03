
export interface IEventBus {
    listeners: {[key: string]: Array<()=>void> },
    on(event: string, callback: () => {}): void,
    off(event: string, callback: () => {}): void,
    emit<T>(event: string, ...args: T[]): void,

}
export class EventBus implements IEventBus {
    listeners: {[key: string]: Array<()=>void> };
    constructor() {
    	this.listeners = {};
    }

    on(event: string, callback: () => {}) {
    	if (!this.listeners[event]) {
    		this.listeners[event] = [];
    	}

    	this.listeners[event].push(callback);
    }

    off(event: string, callback: () => {}) {
    	if (!this.listeners[event]) {
    		throw new Error(`Нет события: ${event}`);
    	}

    	this.listeners[event] = this.listeners[event].filter(
    		listener => listener !== callback
    	);
    }

    emit<T>(event: string, ...args: T[]): void {
    	if (!this.listeners[event]) {
    		throw new Error(`Нет события: ${event}`);
    	}

    	this.listeners[event].forEach(function (listener: (...props: T[])=>void) {
    		listener(...args);
    	});
    }
}
