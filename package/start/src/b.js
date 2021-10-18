console.log("-------私有属性------");

const target = {
  _id: 1024,
  name: "vuejs",
};

const proxy = new Proxy(target, {
  get(target, propkey, proxy) {
    if (propkey[0] === "_") {
      throw Error(`${propkey} is restricted`);
    }
    return Reflect.get(target, propkey, proxy);
  },
  set(target, propkey, value, proxy) {
    if (propkey[0] === "_") {
      throw Error(`${propkey} is restricted`);
    }
    return Reflect.set(target, propkey, value, proxy);
  },
});

console.log(`name: ${proxy.name}`);

// Uncaught Error, restricted
// proxy._id;

// Uncaught Error, restricted
// proxy._id = 42;
