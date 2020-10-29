import { ErrorPage } from './error-page.js';
import { errorPageTemplate } from './templates/error-page.tmpl.js';
const context = {
    title: '500',
    description: 'Мы уже фиксим'
};
new ErrorPage('div', ['error__block'], context, errorPageTemplate);
//# sourceMappingURL=500.js.map