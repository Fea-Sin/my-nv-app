import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/app.ts",
  output: {
    file: "dist/bundle.cjs.js",
    format: "cjs",
  },
  plugins: [
    typescript({ tsconfig: "./tsconfig.json" }),
    commonjs({ extensions: [".js", ".ts"] }),
  ],
};
