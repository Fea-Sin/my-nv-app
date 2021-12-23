import augmentWithDate from "./plugin/augment-with-date";
import buildForEnd from "./plugin/build-end";

export default {
  input: "exama/index.js",
  output: {
    dir: "exama/dist",
    format: "es",
    // plugins: [augmentWithDate()],
  },
  plugins: [buildForEnd()],
};
