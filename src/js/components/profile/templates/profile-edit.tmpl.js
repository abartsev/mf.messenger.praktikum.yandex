export const profileEditTemplate = `
    <div class="link__back">
        <button class="circle__btn circle__btn_type_left"></button>
    </div>
    <div class="profile__body">
        <form class="profile__form">
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
                <div class="profile__form__info__item">
                    <span class="profile__form__info__item-field">Новый пароль</span>
                    <span class="profile__form__info__item-value">{{password}}</span>
                </div>
                <div class="profile__form__info__item">
                    <span class="profile__form__info__item-field">Новый пароль (ещё раз)</span>
                    <span class="profile__form__info__item-value">{{password_repeat}}</span>
                </div>
            </div>
            <div class="profile__form__footer profile__edit__form__footer ">
                <button type="button" class="btn profile__form__footer__btn_type_save save_onclick">Сохранить</button>
            </div>
        </form>
    </div>
`;
//# sourceMappingURL=profile-edit.tmpl.js.map