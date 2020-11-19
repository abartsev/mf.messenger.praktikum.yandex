import { Block } from '../../../lib/block';
import { Context } from '../../types';

export class Button extends Block {

    props: Context;
    className: string;
    text: string
    constructor(props: Context) {
        super(props);
    }

    render () {
        return {
            tag: 'button',
            class: this.props.className,
            text: this.props.text,
            attr: this.props.attr
        };
    }
}
