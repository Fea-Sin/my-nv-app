const { parallel } = require("gulp");
const esbuild = require("esbuild");
const examplePlugin = require("./examplePlugin");

function hcon() {
  console.log("hello console");
  return Promise.resolve("hcon");
}

function hes() {
  return esbuild
    .build({
      entryPoints: ["app.js"],
      bundle: true,
      outfile: "out.js",
      plugins: [examplePlugin],
      loader: { ".png": "dataurl" },
    })
    .catch(() => process.exit(1));
}

exports.default = parallel(hcon, hes);
