const extend = Object.assign;
const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1);
    }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isArray = Array.isArray;
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isFunction = (val) => typeof val === "function";
const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const isDate = (val) => val instanceof Date;
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isMap = (val) => toTypeString(val) === "[object Map]";

export { extend, hasOwn, isArray, isDate, isFunction, isMap, isObject, isPlainObject, isPromise, isSet, isString, isSymbol, objectToString, remove, toTypeString };
