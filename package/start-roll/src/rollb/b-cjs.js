const { count, increment } = require("./increment-cjs");

console.log("count--->", count);
increment();
console.log("count--->", count);

// count += 100;
console.log("count--->", count);
