import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/roll-package/main.js",
  output: {
    file: "src/roll-package/bundle.js",
    format: "esm",
  },
  plugins: [resolve()],
};
