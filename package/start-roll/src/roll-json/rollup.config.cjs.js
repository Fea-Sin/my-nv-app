import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";

export default {
  input: "src/roll-json/main.cjs.js",
  output: {
    file: "src/roll-json/bundle.cjs.js",
    format: "cjs",
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      extensions: [".js"],
    }),
    json(),
  ],
};
