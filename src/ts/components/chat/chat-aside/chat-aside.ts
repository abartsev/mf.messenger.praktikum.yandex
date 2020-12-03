import {Block} from '../../../lib/block';
import {Link} from '../../common/link/link';
import {ListUsers} from './list-user';

export class ChatAside extends Block {
	constructor(chat: any) {
		super({childrenNode: chat, search: ''});
	}

	render() {
		return {
			tag: 'aside',
			class: 'chat__sidebar',
			children: [
				{
					tag: 'div',
					class: 'sidebar__item',
					children: [
						{
							tag: 'div',
							class: 'create__chat',
							text: 'Создать чат',
							attr: {onCreate: 'onCreate'}
						},
						{
							tag: 'div',
							class: 'link__profile',
							childNode: new Link({
								className: 'link__profile__text',
								text: 'Профиль',
								attr: {onClick: 'onClick'}})
						}
					]
				},
				{
					tag: 'div',
					class: 'sidebar__item',
					children: [
						{
							tag: 'div',
							class: 'search',
							children: [
								{
									tag: 'input',
									class: 'search__input',
									type: 'text',
									name: 'search',
									value: 'search',
									attr: {
										onBlur: 'ok'
									}
								},
								{
									tag: 'span',
									class: 'search__icon'
								}
							]
						}
					]
				},
				{
					tag: 'div',
					class: 'sidebar__item',
					children: [
						{
							tag: 'ul',
							class: 'chats__list',
							childrenNode: new ListUsers()
						}
					]
				}
			]
		};
	}
}
