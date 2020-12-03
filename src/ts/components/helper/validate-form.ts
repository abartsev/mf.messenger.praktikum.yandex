/* eslint-disable no-constructor-return */
import {Block} from '../../lib/block';
import {Context} from '../types';

export class ValidateForm extends Block {
    props: Context;
    constructor(props: Context) {
    	super(props);
    	return this;
    }

    render() {
    	return {
    		tag: 'span',
    		class: 'error_msg',
    		text: this.props.text
    	};
    }
}

