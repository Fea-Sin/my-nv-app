console.log("-----Set-----");

const seta = new Set([1, 2, 1, 2]);
console.log(`seta: ${seta}`);

console.log(`seta size: ${seta.size}`);

seta.add(3);
console.log(`seta has 3: ${seta.has(3)}`);

seta.delete(2);
console.log(`seta has 2: ${seta.has(2)}`);

seta.clear();
console.log(`seta size: ${seta.size}`);

const setb = new Set(["one", "two", "three", "four"]);

console.log(`setb keys(): ${setb.keys()}`);
console.log(`setb keys(): ${Array.from(setb.keys())}`);

console.log(`setb values(): ${Array.from(setb.values())}`);

setb.forEach((item) => {
  console.log(`setb item: ${item}`);
});

const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([2, 4, 5, 8, 9]);

console.log(`并集: ${[...new Set([...set1, ...set2])]}`);

console.log(
  `交集: ${[...new Set([...set1].filter((item) => set2.has(item)))]}`
);

console.log(
  `差集: ${[...new Set([...set1].filter((item) => !set2.has(item)))]}`
);
