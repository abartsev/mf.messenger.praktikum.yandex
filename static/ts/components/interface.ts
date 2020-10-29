export interface IContext {
    class_name?: string,
    title?: string,
    for_each?: any[],
    link_href?: string,
    link_text?: string,
    btn_name?: string,
    value?: string,
    [index: string]: any,
    handlers?: any[]
}