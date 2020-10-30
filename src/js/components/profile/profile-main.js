import { Profile } from './profile.js';
import { profileTemplate } from './templates/profile-main.tmpl.js';
const context = {
    name: 'Анатолий',
    email: 'mail@inbox.com',
    edit_onclick: '',
    exit_onclick: ''
};
new Profile('div', ['profile'], context, profileTemplate);
//# sourceMappingURL=profile-main.js.map