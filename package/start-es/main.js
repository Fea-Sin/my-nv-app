import { count, increment } from "./incrementer";
import exec from "./src/exec";

console.log(`start--> ${count}`);
increment();
increment();

console.log(`start--> ${count}`);

console.log(exec);
