import { Block } from './../../../lib/block';

export class ChatMsgs extends Block {
    constructor (store: any) {
        super({childrenNode: store});
    }
    render() {
        return {
            tag: 'div',
            class: 'chat__msg',
            childrenNode: new MsgsList()
        };
    }
}

class MsgsList {
    render() {
        return new Message();
    }
}

class Message extends Block {
    constructor () {
        super({className: '', msg: '', msg_time: ''});
    }
    render( ) {
        return {
            tag: 'div',
            class: `${this.props.className}__msg-block`,
            children: [
                {
                    tag: 'div',
                    class: `${this.props.className}__msg`,
                    children: [
                        {
                            tag: 'p',
                            class: 'msg__text',
                            text: this.props.msg
                        },
                        {
                            tag: 'time',
                            class: 'msg__date',
                            text: this.props.msg_time
                        }
                    ]
                }
            ]
        }
    }
}