import svgResolverPlugin from "./plugin/svg-resolver-plugin";

export default {
  input: "./examb/main.js",
  output: {
    dir: "examb/dist",
    format: "iife",
    sourcemap: true,
  },
  plugins: [svgResolverPlugin()],
};
