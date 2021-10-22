import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/roll-package/main-peer.js",
  output: {
    file: "src/roll-package/bundle.peer.js",
    format: "esm",
  },
  plugins: [commonjs(), resolve()],
  external: ["lodash"],
};
