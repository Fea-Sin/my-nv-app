import onlyDefault from "./plugin/rollup-plugin-only-default";

export default {
  input: "main.js",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [onlyDefault()],
};
