export const signinTemplate = `
    <form class="form form__submit" action="">
        <header class="form__items form__header">
            <h3 class="form__header__text">Регистрация</h3>
        </header>
        <div class="form__items form__body">
            <div class="form__item">
                <label class="form__item__label" for="email">Почта</label>
                <input class="form__item__input email" type="text" name="email" >
            </div>
            <div class="form__item">
                <label class="form__item__label" for="login">Логин</label>
                <input class="form__item__input login" type="text" name="login" >
            </div>
            <div class="form__item">
                <label class="form__item__label" for="password">Пароль</label>
                <input class="form__item__input password" type="password" name="password" >
            </div>
            <div class="form__item">
                <label class="form__item__label" for="password_repeat">Пароль еще раз</label>
                <input class="form__item__input password_repeat" type="password" name="password_repeat" >
            </div>
        </div>
        <div class="form__items form__footer">
            <div class="form__item">
                <button class="form__item__button" type="submit">Зарегистрироваться</button>
            </div>
            <div class="form__item">
                <a class="form__item__link" href="/login.html">Войти</a>
            </div>
        </div>
    </form>
    `;
//# sourceMappingURL=signin.tmpl.js.map