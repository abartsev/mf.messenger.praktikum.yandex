export type Data = string | {[index: string]: string | any[]} | null;
export type Options = {data?: Data, getParam?: {} | null, timeout?: number | null, method?: string, headers?: {}};
