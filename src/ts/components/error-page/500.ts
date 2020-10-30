import { IContext } from '../interface.js';
import { ErrorPage } from './error-page.js';
import { errorPageTemplate } from './templates/error-page.tmpl.js';

const context: IContext = {
    title: '500',
    description: 'Мы уже фиксим'
}
  
new ErrorPage('div', ['error__block'], context, errorPageTemplate);