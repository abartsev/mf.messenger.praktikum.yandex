import { Form } from './form.js';
import { signinTemplate } from './templates/signin.tmpl.js';
import { Button } from './../common/button/button.js';
const context = {
    email: '',
    login: '',
    password: '',
    password_repeat: '',
    form__submit: '',
    Button: new Button(['form__item__button'], { text: 'Зарегистрироваться' })
};
new Form(context, signinTemplate);
//# sourceMappingURL=signin.js.map