const js = "export default 42";

const output = require("esbuild").transformSync(js, {
  format: "cjs",
});

console.log(output);
