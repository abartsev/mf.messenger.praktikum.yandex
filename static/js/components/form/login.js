import { Form } from './form.js';
import { loginTemplate } from './templates/login.tmpl.js';
const context = {
    email: "",
    password: "",
    form__submit: ""
};
new Form(context, loginTemplate);
//# sourceMappingURL=login.js.map