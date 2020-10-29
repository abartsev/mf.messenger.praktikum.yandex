import { IContext } from '../components/interface.js';

export interface ITemplator {
    _template: string,
    compile: (ctx: IContext) => string
}


export class Templator implements ITemplator {
    _template: string;
    constructor(template: string) {
      this._template = template;
    }

    compile(ctx: IContext): string {
      return this._compileTemplate(ctx);
    }

    _compileTemplate(ctx: IContext) {
        const TEMPLATE_REGEXP: RegExp = /\{\{(.*?)\}\}/gi;
        const FOR_TEMPLATE: RegExp = /{{for_each}}|{{\/for_each}}/gmi;

        let key = null;
        let keyfor = null;

        while ((key = TEMPLATE_REGEXP.exec(this._template))) {
            if (key[1]) {
                const tmplValue: string = key[1].trim();
              
                if (tmplValue === 'for_each') {
                    const data = this.get(ctx, tmplValue);
                    
                    let for_tmpl: string[] = this._template.split(FOR_TEMPLATE)

                    for_tmpl[1] = data.reduce((a: string[], e: {[index: string]: string}): string[] => {
                        let modForTmpl: string | Function = for_tmpl[1];
                        
                        for (const key in e) {
                            if (Object.prototype.hasOwnProperty.call(e, key)) {
                                const element: any = e[key];
                                modForTmpl = modForTmpl.replace(new RegExp(`\{\{${key}\}\}`, "gi"), element);  
                            }
                        }               
                        a.push(modForTmpl)
                        return a;
                    }, []).join('')
                    this._template = for_tmpl.join(''); 
                    
                } else if (tmplValue === 'onBlur' || tmplValue === 'onChange' || tmplValue === 'onClick' || tmplValue === 'onFocus') {

                } else {   
                    const data = this.get(ctx, tmplValue);
                    
                    this._template = this._template.replace(new RegExp(key[0], "gi"), data);
                }
            }
        }
        
        return this._template;
    }
    get (obj: IContext | {}, path: string, defaultValue?: string) {
        const keys = path.split('.');
    
        let result: any = obj;
        for (let key of keys) {
          result = result[key];
    
          if (result === undefined) {
            return defaultValue;        
          }
        }
    
        return result ?? defaultValue;
    } 
} 