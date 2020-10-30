import { ErrorPage } from './error-page.js';
import { errorPageTemplate } from './templates/error-page.tmpl.js';
const context = {
    title: '404',
    description: 'Не туда попали'
};
new ErrorPage('div', ['error__block'], context, errorPageTemplate);
//# sourceMappingURL=404.js.map