import json from "rollup-plugin-json";

export default {
  input: "src/roll-json/main.js",
  output: {
    file: "src/roll-json/bundle.js",
    format: "esm",
  },
  plugins: [json()],
};
