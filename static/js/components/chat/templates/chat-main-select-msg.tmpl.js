export const chatMainSelectMsgTemplate = `
    <div class="chat__msg">
        {{for_each}}
            <div class="{{className}}__msg-block">
                <div class="{{className}}__msg">
                    <p class="msg__text">{{msg}}</p>
                    <time class="msg__date">{{msg_time}}</time>
                </div>
            </div>
        {{/for_each}}
    </div>
`;
//# sourceMappingURL=chat-main-select-msg.tmpl.js.map