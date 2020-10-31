export const profileTemplate = `
    <div class="link__back">
        <button class="circle__btn circle__btn_type_left"></button>
    </div>
    <div class="profile__body">
        <div class="profile__form">
            <div class="profile__form__logo">
                <span class="profile__form__logo__img"></span>
                <span class="profile__form__logo__name">{{name}}</span>
            </div>
            <div class="profile__form__info">
                <div class="profile__form__info__item">
                    <span class="profile__form__info__item-field">Почта</span>
                    <span class="profile__form__info__item-value">{{email}}</span>
                </div>
                <div class="profile__form__info__item">
                    <span class="profile__form__info__item-field">Логин</span>
                    <span class="profile__form__info__item-value">{{name}}</span>
                </div>
            </div>
            <div class="profile__form__footer">
                {{ButtonEdit}}
                {{ButtonExit}}
            </div>
        </div>
    </div>
`;