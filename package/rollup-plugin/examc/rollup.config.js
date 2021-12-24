import generateHtmlPlugin from "../plugin/generate-html-plugin";
import path from "path";

export default {
  input: [],
  preserveEntrySignatures: false,
  output: {
    dir: path.resolve(__dirname, "dist"),
    format: "es",
  },
  plugins: [generateHtmlPlugin()],
};
