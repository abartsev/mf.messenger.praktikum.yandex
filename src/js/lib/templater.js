export class Templator {
    compile(template, props) {
        this._propsBlock = props;
        return this._compileTemplate(template);
    }
    _getChildren(children) {
        return children.map(e => this._compileTemplate(e));
    }
    _getChildrenNode(props, blocks) {
        if (Array.isArray(props)) {
            return props.map(e => {
                let block = blocks.render();
                for (const key in e) {
                    if (Object.prototype.hasOwnProperty.call(e, key)) {
                        const value = e[key];
                        if (Array.isArray(value)) {
                            this._getChildrenNode(value, blocks);
                            value.map(elem => {
                                for (const field in elem) {
                                    if (Object.prototype.hasOwnProperty.call(elem, key)) {
                                        const value = elem[field];
                                        block.props[field] = value;
                                    }
                                }
                            });
                        }
                        else {
                            block.props[key] = value;
                        }
                    }
                }
                return block;
            });
        }
        else {
            let arrBlock;
            for (const key in props) {
                if (Object.prototype.hasOwnProperty.call(props, key)) {
                    const value = props[key];
                    if (Array.isArray(value)) {
                        this._getChildrenNode(value, blocks);
                        arrBlock = value.map(elem => {
                            let block = blocks.render();
                            for (const field in elem) {
                                if (Object.prototype.hasOwnProperty.call(elem, key)) {
                                    const value = elem[field];
                                    block.props[field] = value;
                                }
                            }
                            return block;
                        });
                    }
                }
            }
            return arrBlock || [];
        }
    }
    _compileTemplate(ctx) {
        let elementHtml = null;
        let condition = true;
        for (const key in ctx) {
            if (Object.prototype.hasOwnProperty.call(ctx, key)) {
                const element = ctx[key];
                if (key === 'tag') {
                    elementHtml = document.createElement(element);
                }
                else if (key === 'class') {
                    elementHtml.classList.add(...element.split(','));
                }
                else if (key === 'text') {
                    elementHtml.textContent = element;
                }
                else if (key === 'options') {
                    for (const type in element) {
                        if (Object.prototype.hasOwnProperty.call(element, type)) {
                            const val = element[type];
                            elementHtml.setAttribute(type, val);
                        }
                    }
                }
                else if (key === 'value') {
                    element && elementHtml.setAttribute(key, this._propsBlock[element]);
                }
                else if (key === 'attr') {
                    for (const attrKey in element) {
                        if (Object.prototype.hasOwnProperty.call(element, attrKey)) {
                            const attrValue = element[attrKey];
                            elementHtml.dataset[attrKey] = attrValue;
                        }
                    }
                }
                else if (key === 'children' && condition) {
                    this._getChildren(element).map(e => {
                        elementHtml.appendChild(e);
                    });
                }
                else if (key === 'childrenNode') {
                    let arrBlock = this._getChildrenNode(this._propsBlock.childrenNode, element);
                    arrBlock.map(block => {
                        elementHtml.appendChild(block._element);
                    });
                }
                else if (key.includes('childNode') && condition) {
                    elementHtml.appendChild(element._element);
                }
                else if (key.includes('condition')) {
                    if (Array.isArray(element)) {
                        switch (element[1]) {
                            case '>=':
                                condition = element[0] >= element[2];
                                break;
                            case '===':
                                condition = element[0] === element[2];
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
        return elementHtml;
    }
}
//# sourceMappingURL=templater.js.map