import { IContext } from '../interface.js';
import { Profile } from './profile.js';
import { profileTemplate } from './templates/profile-main.tmpl.js';

const context: IContext = {
    name: 'Анатолий',
    email: 'mail@inbox.com',
    edit_onclick: '',
    exit_onclick: ''
}
  
new Profile('div', ['profile'], context, profileTemplate);