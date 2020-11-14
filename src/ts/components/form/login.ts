import { Button } from './../common/button/button.js';
import { IContext } from '../types.js';
import { Form } from './form.js';
import { loginTemplate } from './templates/login.tmpl.js';
import { Link } from './../common/link/link.js';


const context: IContext = {
    email: '',
    password: '',
    form__submit: '',
    Button: new Button(['form__item__button'], {text: 'Авторизоваться'}),
    Link: new Link('a', ['form__item__link', 'login_on_click'], {text: 'Нет аккаунта?', login_on_click: '/signin'})
}
  
export const Login = new Form(context, loginTemplate);