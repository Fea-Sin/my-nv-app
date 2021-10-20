export const extend = Object.assign;

export const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key);

export const objectToString = Object.prototype.toString;

export const toTypeString = (value: unknown): string =>
  objectToString.call(value);

export const isArray = Array.isArray;
export const isString = (val: unknown): boolean => typeof val === "string";
export const isSymbol = (val: unknown): boolean => typeof val === "symbol";
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";

export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const isDate = (val: unknown): val is Date => val instanceof Date;

export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === "[object Object]";

export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === "[object Set]";

export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === "[object Map]";
