import { b as bar } from './bar-dc4ff25b.js';

const result = bar + " and main";

function main () {
  import('./foo-48492e23.js').then(({ default: foo }) => {
    console.log("Code split dynamic module:", foo);
  });

  console.log(`Code split several entry share some module: ${result}`);
}

export { main as default };
