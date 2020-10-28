import { Block, IBlock } from '../../template/block.js';
import { form_template } from './form.tmpl.js';
import { IContext } from '../interface.js';

export class Form extends Block {

    props: IContext;
    constructor(props: IContext) {
        super("div", props);
    }

    render() {
        // В проект должен быть ваш собственный шаблонизатор
        return form_template;
    }
}

function render(query: string, block: IBlock) {
    const root = document.querySelector(query) as HTMLElement;
    root.appendChild(block.getContent());
    return root;
  }

  const context: IContext = {
    class_name: 'layout_type_modal',
    title: 'Вход',
    for_tmpl: [
        {name: 'Почта', field_name: 'email', field_type: 'type', value: '', onChange: `"(e)=>{console.log(e, this)}"`}, 
        {name: 'Пароль', field_name: 'password', field_type: 'password', value: '', onChange: `"(e)=>{console.log(e, this)}"`}
    ],
    link_href: '/signin.html',
    link_text: 'Нет аккаунта?',
    btn_name: 'Авторизоваться',
    
}
  
  const form = new Form(context);
  
  render(".app", form);
