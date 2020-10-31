export const loginTemplate = `
    <form class="form form__submit" action="">
        <header class="form__items form__header">
            <h3 class="form__header__text">Вход</h3>
        </header>
        <div class="form__items form__body">
            <div class="form__item">
                <label class="form__item__label" for="email">Почта</label>
                <input value="{{email}}" class="form__item__input email" type="text" name="email" >
            </div>
            <div class="form__item">
                <label class="form__item__label" for="password">Пароль</label>
                <input value="{{password}}" class="form__item__input password" type="password" name="password" >
            </div>
        </div>
        <div class="form__items form__footer">
            <div class="form__item">
                {{Button}}
            </div>
            <div class="form__item">
                <a class="form__item__link" href="/signin.html">Нет аккаунта?</a>
            </div>
        </div>
    </form>
    `;
//# sourceMappingURL=login.tmpl.js.map