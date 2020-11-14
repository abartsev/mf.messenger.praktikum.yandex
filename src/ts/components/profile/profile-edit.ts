import { Button } from './../common/button/button.js';
import { IContext } from '../types.js';
import { Profile } from './profile.js';
import { profileEditTemplate } from './templates/profile-edit.tmpl.js';

const context: IContext = {
    name: 'Анатолий',
    email: 'mail@inbox.com',
    password: 'введите',
    password_repeat: 'введите',
    save_onclick: '',
    Button: new Button(['btn', 'profile__form__footer__btn_type_save', 'save_onclick'], {text: 'Сохранить'})
}

new Profile('div', ['profile'], context, profileEditTemplate);