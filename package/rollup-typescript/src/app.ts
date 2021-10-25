import { add, substract } from "./math";
import { toLowerCase } from "./string";

const x = 20;
const y = 12;

console.log(`${x} + ${y} = ${add(x, y)}`);
console.log(`${x} - ${y} = ${substract(x, y)}`);

export default substract;
