console.log("----Proxy 验证器---");

const target = {
  _id: 1024,
  name: "vuejs",
};

const validators = {
  name(val) {
    return typeof val === "string";
  },
  _id(val) {
    return typeof val === "number" && val > 1024;
  },
};

const createValidator = (target, validator) => {
  return new Proxy(target, {
    _validator: validator,
    set(target, propkey, value, proxy) {
      let validator = this._validator[propkey](value);
      if (validator) {
        return Reflect.set(target, propkey, value, proxy);
      } else {
        throw Error(`Cannot set ${propkey} to ${value}. Invalid type`);
      }
    },
  });
};

const proxy = createValidator(target, validators);

proxy.name = "vue-js.com";

// Uncaught Error, Invalid type
// proxy.name = 100;

proxy._id = 1090;

// Uncaught Error, Invalid
// proxy._id = 42;
