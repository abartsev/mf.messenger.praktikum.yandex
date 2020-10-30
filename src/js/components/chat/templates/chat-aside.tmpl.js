export const chatAsideTemplate = `
        <div class="sidebar__item">
            <div class="link__profile">
                <span class="link__profile__text">Профиль</span>
            </div>
        </div>
        <div class="sidebar__item">
            <div class="search">
                <input type="text" class="search__input">
                <span class="search__icon"></span>
            </div>
        </div>
        <div class="sidebar__item">
            <ul class="chats__list">
            {{for_each}}
                <li class="user__card">
                    <div class="card__info">
                        <div class="card__info__left">
                            <div class="card__info__logo"></div>
                        </div>
                        <div class="card__info__right">
                            <span class="card__info__name">{{name}}</span>
                            <div class="card__info__last-msg">
                                <span class="card__info__last-msg-you">Вы:</span>{{last_msg}}
                            </div>
                        </div>
                    </div>
                    <div class="card__alert card__alert__new-msg">
                        <time class="card__alert__date">{{last_time}}</time>
                        <div class="card__alert__circle">
                            <span class="card__alert__number">{{number_new_msg}}</span>
                        </div>
                    </div>
                </li>
                {{/for_each}}
            </ul>
        </div>
`;
//# sourceMappingURL=chat-aside.tmpl.js.map