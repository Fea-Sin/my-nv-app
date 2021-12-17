let js = "alert('test')";
let output = require("esbuild").transformSync(js, {
  format: "iife",
});

console.log(output);
