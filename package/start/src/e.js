console.log("-----Map-----");

const mapa = new Map();
mapa.set("name", "vuejs.cn");
console.log(`mapa: ${mapa}`);

console.log(`map get: ${mapa.get("name")}`);
console.log(`map size: ${mapa.size}`);
console.log(`mapa: `, mapa);

mapa.set("age", "18");
console.log(`map has: ${mapa.has("age")}`);

console.log(`map delete: ${mapa.delete("name")}`);

console.log(`map clear: ${mapa.clear()}`);
console.log(`mapa: ${mapa}`);
console.log(`map size: ${mapa.size}`);

console.log("---------------");
const mapb = new Map();
mapb.set("hello", "world");
mapb.set("世", "界");

console.log(`mapb keys(): ${mapb.keys()}`);
console.log(`mapb keys(): ${[...mapb.keys()]}`);
console.log(`mapb values(): ${[...mapb.values()]}`);
console.log(`mapb entries(): ${[...mapb.entries()][1]}`);
console.log(`mapb 解构:`, [...mapb]);
console.log(`mapb entries(): ${typeof [...mapb.entries()][1]}`);

mapb.forEach((value, key) => {
  console.log(value, key);
});
