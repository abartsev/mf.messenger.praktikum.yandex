import { IContext } from '../interface.js';
import { Profile } from './profile.js';
import { profileEditTemplate } from './templates/profile-edit.tmpl.js';

const context: IContext = {
    name: 'Анатолий',
    email: 'mail@inbox.com',
    password: 'введите',
    password_repeat: 'введите',
    save_onclick: ''
}
  
new Profile('div', ['profile'], context, profileEditTemplate);