import commonjs from "@rollup/plugin-commonjs";
import { getBabelOutputPlugin, babel } from "@rollup/plugin-babel";
import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      babelHelpers: "runtime",
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              edge: "17",
              firefox: "60",
              chrome: "67",
              safari: "11.1",
            },
          },
        ],
      ],
      plugins: [["@babel/plugin-transform-runtime"]],
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
