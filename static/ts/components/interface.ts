export interface IContext {
    class_name?: string,
    title?: string,
    for_tmpl?: any[],
    link_href?: string,
    link_text?: string,
    btn_name?: string,
    value?: string,
    [index: string]: any,
    onBlur?: () => {},
    onFocus?: () => {},
    onClick?: (e: { target: HTMLInputElement }, num: number) => void,
    onChange?: (e: { target: HTMLInputElement }, num: number) => void
}