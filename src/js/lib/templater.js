import { TEMPLATE_REGEXP, FOR_TEMPLATE } from '../constants.js';
export class Templator {
    constructor(template) {
        this._template = template;
    }
    compile(ctx) {
        return this._compileTemplate(ctx);
    }
    _compileTemplate(ctx) {
        let key = null;
        while ((key = TEMPLATE_REGEXP.exec(this._template))) {
            if (key[1]) {
                const tmplValue = key[1].trim();
                if (tmplValue === 'for_each') {
                    const data = this.get(ctx, tmplValue);
                    let for_tmpl = this._template.split(FOR_TEMPLATE);
                    for_tmpl[1] = data.reduce((a, e) => {
                        let modForTmpl = for_tmpl[1];
                        for (const key in e) {
                            if (Object.prototype.hasOwnProperty.call(e, key)) {
                                const element = e[key];
                                modForTmpl = modForTmpl.replace(new RegExp(`\{\{${key}\}\}`, "gi"), element);
                            }
                        }
                        a.push(modForTmpl);
                        return a;
                    }, []).join('');
                    this._template = for_tmpl.join('');
                }
                else {
                    let data = this.get(ctx, tmplValue);
                    if (typeof data === 'object') {
                        let el = document.createElement('div');
                        el.appendChild(data._element);
                        data = el.innerHTML;
                    }
                    this._template = this._template.replace(new RegExp(key[0], "gi"), data);
                }
            }
        }
        return this._template;
    }
    get(obj, path, defaultValue) {
        const keys = path.split('.');
        let result = obj;
        for (let key of keys) {
            result = result[key];
            if (result === undefined) {
                return defaultValue;
            }
        }
        return result !== null && result !== void 0 ? result : defaultValue;
    }
}
//# sourceMappingURL=templater.js.map