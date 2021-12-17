const js = "fn = obj => { return obj.x }";

const output = require("esbuild").transformSync(js, {
  minify: true,
});

console.log(output);
