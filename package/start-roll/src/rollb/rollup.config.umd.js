import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/rollb/b-cjs.js",
  output: {
    file: "src/rollb/bundle.umd.js",
    format: "umd",
    name: "RollB",
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      extensions: [".js"],
    }),
  ],
};
