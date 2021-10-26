export const extend: (val, target: Record<any, any>) => Record<any, any>;

export const remove: <T>(arr: T[], el: T) => void;

export const hasOwn: (val: object, key: string | symbol) => boolean;

export const isArray: (val: unknown) => boolean;

export const isString: (val: unknown) => boolean;

export const isSymbol: (val: unknown) => boolean;

export const isObject: (val: unknown) => boolean;

export const isFunction: (val: unknown) => boolean;

export const isPromise: (val: unknown) => boolean;

export const isDate: (val: unknown) => boolean;

export const isPlainObject: (val: unknown) => boolean;

export const isSet: (val: unknown) => boolean;

export const isMap: (val: unknown) => boolean;
