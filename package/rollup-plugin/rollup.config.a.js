import augmentWithDate from "./plugin/augment-with-date";

export default {
  input: "exama/index.js",
  output: {
    dir: "exama/dist",
    format: "es",
    // plugins: [augmentWithDate()],
  },
};
