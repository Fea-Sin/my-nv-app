import { count, increment } from "./incrementer";
import exec from "./src/exec";
import execIndex from "./src/exec-index";

console.log(`start--> ${count}`);
increment();
increment();

console.log(`start--> ${count}`);

console.log(exec);

console.log(execIndex);
