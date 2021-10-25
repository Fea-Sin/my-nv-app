import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/app.ts",
  output: {
    file: "dist/bundle.umd.js",
    format: "umd",
    name: "MyRollupTypeScript",
  },
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
