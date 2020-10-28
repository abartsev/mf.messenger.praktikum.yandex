export const form_template = (function () {
    return `
        <div class="{{class_name}}">
            <form class="form" action="">
                <header class="form__items form__header">
                    <h3 class="form__header__text">{{title}}</h3>
                </header>
                <div class="form__items form__body">
                    {{for_tmpl}}
                        <div class="form__item">
                            <label class="form__item__label" for="{{field_name}}">{{name}}</label>
                            <input oninput={{onChange}} value="{{value}}" class="form__item__input" type="{{field_type}}" name="{{field_name}}" >
                        </div>
                    {{/for_tmpl}}
                </div>
                <div class="form__items form__footer">
                    <div class="form__item">
                        <button class="form__item__button" type="submit">{{btn_name}}</button>
                    </div>
                    <div class="form__item">
                        <a class="form__item__link" href="{{link_href}}">{{link_text}}</a>
                    </div>
                </div>
            </form>
        </div>
    `;
})();
//# sourceMappingURL=form.tmpl.js.map