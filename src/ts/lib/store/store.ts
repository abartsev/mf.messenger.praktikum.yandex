
import { IBlock } from '../block';
export interface IStore {
    listeners: {[key: string]: {block:IBlock, path: any} },
    on(event: string, block: IBlock, path: string ): IBlock,
    emit(event: string, props: any): void,

}
export class Store implements IStore{
    listeners: {[key: string]: {block:IBlock, path: string} };
    store: any;
    constructor(store: any) {
      this.listeners = {};
      this.store = store;
    }
  
    on(event: string, block: IBlock, path: string ) {
      if (!this.listeners[event]) {
        this.listeners[event] = {
            block,
            path
        };
      }
      return block;
    }
  
    emit(event: string, props: any): void {
 
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        let path = this.listeners[event].path;
        this.listeners[event].block.props[path] = props;
    }
  }
  