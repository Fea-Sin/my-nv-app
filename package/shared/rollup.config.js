import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.ts",
  plugins: [
    typescript({ tsconfig: "./tsconfig.json" }),
    commonjs({ extensions: [".js", ".ts"] }),
  ],
  output: [
    {
      file: "dist/bundle.esm.js",
      format: "esm",
    },
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
    },
  ],
};
