import {Block} from './../../lib/block';

export class Notification extends Block {
	constructor(props: string) {
		super({text: props});
	}

	render() {
		return {
			tag: 'div',
			class: 'block__notification',
			children: [
				{
					tag: 'span',
					class: 'notification__text',
					text: this.props.text
				}
			]
		};
	}
}
