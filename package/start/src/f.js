// Map 转为 Array

const mapa = new Map([
  [1, 1],
  [2, 2],
  [3, 3],
]);

console.log(`map => array`, [...mapa]);

console.log(`map entries`, [...mapa.entries()]);
console.log(`map entries: ${[...mapa.entries()]}`);

// Object 转为 Map
const obj = { a: 1, b: 2 };
const mapb = new Map(Object.entries(obj));

console.log(`Object => Map`, mapb);

// Map 转为 Object
const objb = {};
mapb.forEach((value, key) => {
  objb[key] = value;
});
console.log("Map => Object:", objb);
