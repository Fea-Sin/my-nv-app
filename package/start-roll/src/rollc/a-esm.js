import { count, increment } from "./increment-esm";

console.log("count--->", count);
increment();
console.log("count--->", count);

// Error: Illegal reassignment to import "count"
// count += 10;
