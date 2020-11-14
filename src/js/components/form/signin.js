import { Form } from './form.js';
import { signinTemplate } from './templates/signin.tmpl.js';
import { Button } from './../common/button/button.js';
import { Link } from './../common/link/link.js';
const context = {
    email: '',
    login: '',
    password: '',
    password_repeat: '',
    form__submit: '',
    Button: new Button(['form__item__button'], { text: 'Зарегистрироваться' }),
    Link: new Link('a', ['form__item__link', 'sign_on_click'], { text: 'Войти', sign_on_click: '/' })
};
export const Signin = new Form(context, signinTemplate);
//# sourceMappingURL=signin.js.map