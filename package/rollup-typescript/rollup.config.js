import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/app.ts",
  output: {
    file: "dist/bundle.esm.js",
    format: "esm",
  },
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
