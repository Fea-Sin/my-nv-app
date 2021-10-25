import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: "src/bundle.js",
    format: "esm",
  },
  plugins: [
    resolve(),
    babel({
      // 只编译我们的源代码
      exclude: "node_modules/**",
    }),
  ],
};
