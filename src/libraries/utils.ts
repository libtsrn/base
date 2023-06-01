// ツール。

export const sleep = ms => new Promise(res => setTimeout(res, ms));
export const toSnakeCase = (name: string): string =>
  name.split(/(?=[A-Z])/).join('_').toLowerCase();