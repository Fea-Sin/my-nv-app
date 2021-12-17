const esbuild = require("esbuild");

const output = esbuild.transformSync("let x: number = 1", {
  loader: "ts",
});

console.log(output);
