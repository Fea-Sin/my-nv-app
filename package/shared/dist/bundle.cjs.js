'use strict';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var src = {};

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMap = exports.isSet = exports.isPlainObject = exports.isDate = exports.isPromise = exports.isFunction = exports.isObject = exports.isSymbol = exports.isString = exports.isArray = exports.toTypeString = exports.objectToString = exports.hasOwn = exports.remove = exports.extend = void 0;
exports.extend = Object.assign;
const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1);
    }
};
exports.remove = remove;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
exports.hasOwn = hasOwn;
exports.objectToString = Object.prototype.toString;
const toTypeString = (value) => exports.objectToString.call(value);
exports.toTypeString = toTypeString;
exports.isArray = Array.isArray;
const isString = (val) => typeof val === "string";
exports.isString = isString;
const isSymbol = (val) => typeof val === "symbol";
exports.isSymbol = isSymbol;
const isObject = (val) => val !== null && typeof val === "object";
exports.isObject = isObject;
const isFunction = (val) => typeof val === "function";
exports.isFunction = isFunction;
const isPromise = (val) => {
    return (0, exports.isObject)(val) && (0, exports.isFunction)(val.then) && (0, exports.isFunction)(val.catch);
};
exports.isPromise = isPromise;
const isDate = (val) => val instanceof Date;
exports.isDate = isDate;
const isPlainObject = (val) => (0, exports.toTypeString)(val) === "[object Object]";
exports.isPlainObject = isPlainObject;
const isSet = (val) => (0, exports.toTypeString)(val) === "[object Set]";
exports.isSet = isSet;
const isMap = (val) => (0, exports.toTypeString)(val) === "[object Map]";
exports.isMap = isMap;

}(src));

var index = /*@__PURE__*/getDefaultExportFromCjs(src);

module.exports = index;
