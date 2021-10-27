import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      babelHelpers: "runtime",
    }),
  ],
  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/bundle.esm.js",
      format: "esm",
    },
    {
      file: "dist/bundle.iife.js",
      format: "iife",
      name: "MySharedUse",
    },
  ],
};
