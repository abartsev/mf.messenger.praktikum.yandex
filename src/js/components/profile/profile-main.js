import { Button } from './../common/button/button.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import { Profile } from './profile.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import { profileTemplate } from './templates/profile-main.tmpl.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
const context = {
    name: 'Анатолий',
    email: 'mail@inbox.com',
    edit_onclick: '',
    exit_onclick: '',
    ButtonEdit: new Button(['btn__link', 'profile__form__footer__btn', 'edit_onclick'], { text: 'Изменить данные' }),
    ButtonExit: new Button(['btn__link', 'profile__form__footer__btn', 'btn__link_color_red', 'exit_onclick'], { text: 'Выйти' })
};
new Profile('div', ['profile'], context, profileTemplate);
//# sourceMappingURL=profile-main.js.map