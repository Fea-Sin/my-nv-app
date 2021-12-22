import answer from "./src/foo";
import { foo } from "./src/foo";

const result = answer + " and main" + foo;

/**
 * the exprot not default will not bundle
 * if rollup use the only-default-for-entry plugin
 *
 */
export const myFoo = foo;

export default result;
