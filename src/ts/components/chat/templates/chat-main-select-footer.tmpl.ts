export const chatMainSelectFooterTemplate = `
    <div class="chat__footer">
        <div class="footer__attach">
            <div class="attach__menu">
                <ul class="menu__modal attach__menu__active">
                    <li class="menu__item"><span class="menu__icon menu__icon-image"></span> Фото или Видео</li>
                    <li class="menu__item"><span class="menu__icon menu__icon-newfile"></span> Файл</li>
                    <li class="menu__item"><span class="menu__icon menu__icon-dot"></span> Локация</li>
                </ul>
            </div>
        </div>
        <input value="{{field_msg}}" class="footer__input" type="text" placeholder="Сообщение">
        <button class="circle__btn circle__btn_type_right btn_onclick"></button>
    </div>
`;