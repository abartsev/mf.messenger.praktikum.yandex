import { Button } from './../common/button/button.js';
import { IContext } from '../interface.js';
import { Profile } from './profile.js';
import { profileTemplate } from './templates/profile-main.tmpl.js';

const context: IContext = {
    name: 'Анатолий',
    email: 'mail@inbox.com',
    edit_onclick: '',
    exit_onclick: '',
    ButtonEdit: new Button(['btn__link', 'profile__form__footer__btn', 'edit_onclick'], {text: 'Изменить данные'}),
    ButtonExit: new Button(['btn__link', 'profile__form__footer__btn', 'btn__link_color_red', 'exit_onclick'], {text: 'Выйти'})
}

new Profile('div', ['profile'], context, profileTemplate);