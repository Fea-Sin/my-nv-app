const js = "module.exports = 42";

const output = require("esbuild").transformSync(js, {
  format: "esm",
});

console.log(output);
