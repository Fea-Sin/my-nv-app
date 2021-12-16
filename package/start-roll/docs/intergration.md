# Rollup 与其他工具集成

## Gulp

Rollup 返回 gulp 能明白的 promises，所以集成是很容易的

```js
const gulp = require("gulp");
const rollup = require("rollup");
const rollupTypescript = require("rollup-plugin-typescript");

gulp.task("build", async function () {
  const bundle = await rollup.rollup({
    input: "./src/main.ts",
    plugins: [rollupTypescript()],
  });

  await bundle.write({
    file: "./dist/library.js",
    format: "umd",
    name: "library",
    sourcemap: true,
  });
});
```
