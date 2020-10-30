import { Form } from './form.js';
import { signinTemplate } from './templates/signin.tmpl.js';
const context = {
    email: '',
    login: '',
    password: '',
    password_repeat: '',
    form__submit: ''
};
new Form(context, signinTemplate);
//# sourceMappingURL=signin.js.map