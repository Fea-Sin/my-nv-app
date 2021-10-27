function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class Person {
  constructor() {
    _defineProperty(this, "name", "Rollup + Babel Person");

    _defineProperty(this, "age", 42);
  }

  toSay() {
    console.log("HI: ".concat(this.name, ", ").concat(this.age));
  }

}

const remove = (arr, el) => {
  const i = arr.indexOf(el);

  if (i > -1) {
    arr.splice(i, 1);
  }
};

const objectToString = Object.prototype.toString;

const toTypeString = value => objectToString.call(value);

const isPlainObject = val => toTypeString(val) === "[object Object]";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const myobj = {
  a: "Hello World",
  b: "vue3js"
};

const Hello = _objectSpread({
  id: 42
}, myobj);

const hi = new Person();
hi.toSay();
const arr = ["a", "n", "p", "l"];
remove(arr, "p");
const oba = {};
console.log("plain-object--->", isPlainObject(oba)); // console.log("npm link shared--->", join(arr, "~"));

console.log("npm link shared--->", arr);
console.log("babel rollup--->", Hello);

export { Hello as default };
