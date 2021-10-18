console.log("-----Object.defineProperty----");

const obj = {};

Object.defineProperty(obj, "a", {
  value: 1,
  writable: false, // 是否可写
  configurable: false, // 是否可配置
  enumerable: false, // 是否可枚举
});

obj.a = 3;
console.log(`obj.a: ${obj.a}`);

delete obj.a;
console.log(`obj.a: ${obj.a}`);

for (key in obj) {
  console.log(`obj key: ${obj[key]}`);
}
