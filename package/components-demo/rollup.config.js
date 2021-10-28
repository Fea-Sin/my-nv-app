import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  plugins: [commonjs(), nodeResolve()],
  output: {
    file: "dist/bundle.iife.js",
    format: "iife",
    name: "ComponentsDemo",
    globals: {
      vue: "Vue",
    },
  },
  external: ["vue"],
};
