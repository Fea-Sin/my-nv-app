function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es6.map.js";
import "core-js/modules/es6.string.iterator.js";
import "core-js/modules/es6.object.to-string.js";
import "core-js/modules/es6.array.iterator.js";
import "core-js/modules/web.dom.iterable.js";
import "core-js/modules/es6.object.keys.js";
import "core-js/modules/es6.symbol.js";
import "core-js/modules/es6.array.filter.js";
import "core-js/modules/es6.object.get-own-property-descriptor.js";
import "core-js/modules/es7.object.get-own-property-descriptors.js";
var amap = new Map();
var obj = {
  name: "vuejs",
  version: 3
};
amap.set("mya", _objectSpread({}, obj));
export default amap;