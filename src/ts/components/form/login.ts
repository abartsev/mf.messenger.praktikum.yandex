import { Button } from './../common/button/button.js';
import { IContext } from '../interface.js';
import { Form } from './form.js';
import { loginTemplate } from './templates/login.tmpl.js';

const context: IContext = {
    email: '',
    password: '',
    form__submit: '',
    Button: new Button(['form__item__button'], {text: 'Авторизоваться'})
}
  
new Form(context, loginTemplate);