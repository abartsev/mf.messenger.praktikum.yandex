import { Block } from './../../../lib/block';
export class ListUsers {
    render() {
        return new ListUser();
    }
}

class ListUser extends Block {
    constructor () {
        super({name: '', last_msg: '', last_time: '', number_new_msg: ''});
    }

    render() {
        return {
            tag: 'li',
            class: 'user__card',
            children: [
                {
                    tag: 'div',
                    class: 'card__info',
                    children: [
                        {
                            tag: 'div',
                            class: 'card__info__left',
                            children: [
                                {
                                    tag: 'div',
                                    class: 'card__info__logo'
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            class: 'card__info__right',
                            children: [
                                {
                                    tag: 'span',
                                    class: 'card__info__name',
                                    text: this.props.name
                                },
                                {
                                    tag: 'div',
                                    class: 'card__info__last-msg',
                                    children: [
                                        {
                                            tag: 'span',
                                            class: 'card__info__last-msg-you',
                                            text: 'Вы:'
                                        },
                                        {
                                            tag: 'span',
                                            text: this.props.last_msg
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    class: 'card__alert,card__alert__new-msg',
                    children: [
                        {
                            tag: 'time',
                            class: 'card__alert__date',
                            text: this.props.last_time
                        },
                        {
                            tag: 'div',
                            class: 'card__alert__circle',
                            children: [
                                {
                                    tag: 'span',
                                    class: 'card__alert__number',
                                    text: this.props.number_new_msg
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}