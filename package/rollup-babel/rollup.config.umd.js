import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.umd.js",
    format: "umd",
    name: "MyRollupBabel",
  },
  plugins: [
    commonjs(),
    resolve(),
    babel({
      // 只编译我们的源代码
      exclude: "node_modules/**",
      runtimeHelpers: true,
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            corejs: "3",
          },
        ],
      ],
    }),
  ],
};
