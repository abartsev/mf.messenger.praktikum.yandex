import { IContext } from '../interface.js';
import { Form } from './form.js';
import { loginTemplate } from './templates/login.tmpl.js';

const context: IContext = {
    email: '',
    password: '',
    form__submit: ''
}
  
new Form(context, loginTemplate);