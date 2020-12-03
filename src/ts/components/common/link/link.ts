/* eslint-disable no-useless-constructor */
import {Block} from '../../../lib/block';
import {Context} from '../../types';
export class Link extends Block {
    props: Context;
    _onClick: () => void;
    constructor(props: Context) {
    	super(props);
    }

    render() {
    	return {
    		tag: 'a',
    		class: this.props.className,
    		text: this.props.text,
    		attr: this.props.attr
    	};
    }
}
