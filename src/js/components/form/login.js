import { Button } from './../common/button/button.js';
import { Form } from './form.js';
import { loginTemplate } from './templates/login.tmpl.js';
const context = {
    email: '',
    password: '',
    form__submit: '',
    Button: new Button(['form__item__button'], { text: 'Авторизоваться' })
};
new Form(context, loginTemplate);
//# sourceMappingURL=login.js.map